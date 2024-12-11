import { useEffect, useState } from "react";
import { SampleData } from "api/types";
import axios from 'axios';


export default function HighPriorityProblems() {
    const [data, setData] = useState<SampleData | null>(null)
    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            try {
                const { data: allData } = await axios.get<SampleData>('/api/data', {
                    params: {
                        datapoints: 100,
                        type: "",
                        priority: "high",
                        status: "open",
                    }
                })
                console.log(allData)
                if (mounted) {
                    // Sort the data here
                    setData(allData)
                }
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        }
        fetchData();

        return () => { mounted = false; }
    }, [])
    return (

        <>
            <div style={styles}>
                <div className="">
                    <p className="text-2xl font-bold">All Problems</p>
                    Filter By:
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-grey-50">
                        <tr>
                            <th>Issue</th>
                            <th>Priority</th>
                            <th>Assignee</th>
                            <th>Created On</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dividy-y divide-gray-200">
                        {data && data.results.map((issue) => (
                            <tr key={issue.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{issue.subject}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{issue.priority}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{issue.assignee_id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{issue.created}</td>
                            </tr>

                            
                        ))}
                    </tbody>
                </table>
                <div>Total Issues: {data ? data.results.length : 0}</div>
            </div>
        </>
    )
}

const styles = {
    maxWidth: '800px', 
    margin: '0 auto', 
    padding: '20px',
}