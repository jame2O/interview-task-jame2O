import { SampleData } from "api/types";
import axios from 'axios';

export const backend_tasks = async () => {
    // Step 1: Get Data:
    let allData: SampleData;
    try {
        const response = await axios.get<SampleData>('/api/data', {
            params: {
                datapoints: 500,
                type: "",
                priority: "",
                status: "",
            }
        })
        allData = response.data;
    } catch (error) {
        console.error('Failed to fetch data', error);
        return;
    }
    if (!allData) {
        console.error('No data recieved')
        return;
    }
    // Task 1 & 2: percentages
    let problemC = 0, questionC = 0, taskC = 0;
    let lowC = 0, mediumC = 0, highC = 0;
    let timeTotal = 0
    let satScore = 0;
    let highestTime = 0

    allData.results.forEach(issue => {
        if (issue.type === 'problem') problemC++;
        if (issue.type === 'question') questionC++;
        if (issue.type === 'task') taskC++;

        if (issue.priority === 'low') lowC++;
        if (issue.priority === 'normal') mediumC++;
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
            satScore = parseInt(issue.satisfaction_rating.score)
        }
        timeTotal += minuteDifference;
    });

    // Finish up on tasks
    // Should be 500, but we'll check the length and compare with that anyway
    let totalC = allData.results.length

    const problemP = (problemC / totalC) * 100;
    const questionP = (questionC / totalC) * 100;
    const taskP = (taskC / totalC) * 100;

    const lowP = (lowC / totalC) * 100;
    const mediumP = (mediumC / totalC) * 100;
    const highP = (highC / totalC) * 100;

    const averageClosingTime = timeTotal / totalC

    //Now constructing the JSON to return

    const result = {
        average_closing_time: averageClosingTime,
        type_percentages: {
            problem: problemP,
            question: questionP,
            task: taskP,
        },
        priority_percentages: {
            low: lowP,
            medium: mediumP,
            high: highP,
        },
        longest_close_satisfaction_score: satScore
    }

    return JSON.stringify(result)
}
