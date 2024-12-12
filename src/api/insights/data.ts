import { SampleData } from "api/types";
import axios from 'axios';
import { Request, Response } from 'express';

const DATA_URL = 'https://sampleapi.squaredup.com/integrations/v1/service-desk';

export const GET = async (req: Request, res: Response) => {
    const { datapoints, type, priority, status } = req.query;
    
    try {
        const { data } = await axios.get<SampleData>(`${DATA_URL}?type=${type}&priority=${priority}&status=${status}&datapoints=${datapoints}`)
        const processed_data = await backend_tasks(data)
        res.send(processed_data)
    } catch (error) {
        res.status(500).send({error: 'Failed to fetch requested data'})
    }
}


export const backend_tasks = async (allData: SampleData) => {
    // Step 1: Get Data:
    if (!allData) {
        console.error('No data recieved')
        return;
    }
    // Task 1 & 2: percentages
    let problemC = 0, questionC = 0, taskC = 0;
    let lowC = 0, normalC = 0, highC = 0;
    let timeTotal = 0
    let satScore = ""
    let highestTime = 0

    allData.results.forEach(issue => {
        if (issue.type === 'problem') problemC++;
        if (issue.type === 'question') questionC++;
        if (issue.type === 'task') taskC++;

        if (issue.priority === 'low') lowC++;
        if (issue.priority === 'normal') normalC++;
        if (issue.priority === 'high') highC++;
        
        // Task 3: Average closing time
        // Calculate time between opening and last update (assume when closed)
        let minuteDifference = 0
        const createdTimeStr = issue.created
        const updatedTimeStr = issue.updated

        const createdTime = new Date(createdTimeStr)
        const updatedTime = new Date(updatedTimeStr)

        const differenceMS = updatedTime.getTime() - createdTime.getTime()
        minuteDifference = differenceMS / (1000 * 60);
        // Task 4: Get satisfaction score of issue with highest time to close
        if (minuteDifference > highestTime) {
            satScore = issue.satisfaction_rating.score
        }
        timeTotal += minuteDifference;
    });

    // Finish up on tasks
    // Should be 500, but we'll check the length and compare with that anyway
    let totalC = allData.results.length

    const problemP = ((problemC / totalC) * 100).toFixed(1);
    const questionP = ((questionC / totalC) * 100).toFixed(1);
    const taskP = ((taskC / totalC) * 100).toFixed(1);

    const lowP = ((lowC / totalC) * 100).toFixed(1);
    const normalP = ((normalC / totalC) * 100).toFixed(1);
    const highP = ((highC / totalC) * 100).toFixed(1);;

    const averageClosingTimeMins = (timeTotal / totalC).toFixed(1);

    //Now constructing the JSON to return

    const result = {
        average_closing_time: averageClosingTimeMins,
        type_percentages: {
            problem: problemP,
            question: questionP,
            task: taskP,
        },
        priority_percentages: {
            low: lowP,
            medium: normalP,
            high: highP,
        },
        longest_close_satisfaction_score: satScore
    }
    return (result)
}
