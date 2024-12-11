import { useEffect, useState } from "react";
import { SampleData } from "api/types";
import axios from 'axios';
export default function PriorityIssues() {
    const [data, setData] = useState<SampleData | null>(null)
    const [filteredData, setFilteredData] = useState<SampleData | null>(null)
    const [typeFilter, setTypeFilter] = useState<string>('')
    const [statusFilter, setStatusFilter] = useState<string>('')
    const [priorityFilter, setPriorityFilter] = useState<string>('')
    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            try {
                const { data: allData } = await axios.get<SampleData>('/api/data', {
                    params: {
                        datapoints: 100,
                        type: "",
                        priority: "",
                        status: "",
                    }
                })
                if (mounted) {
                    // Sort the data here
                    const prioritiesAsInt: any = { "low": 1, "normal": 2, "high": 3}

                    const sortedData = {
                        ...allData,
                        issues: allData.results.sort((a, b) => prioritiesAsInt[a.priority] - prioritiesAsInt[b.priority]).reverse()
                    }
                    console.log(sortedData)
                    setData(sortedData)
                    setFilteredData(sortedData)
                }
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        }
        fetchData();

        return () => { mounted = false; }
    }, [])
    const applyFilter = () => {
        // Apply the filter
        if (data) {
            const filtered = data.results.filter(issue => {
                return (typeFilter ? issue.type === typeFilter : true)
                    && (priorityFilter ? issue.priority === priorityFilter : true)
                    && (statusFilter ? issue.status === statusFilter : true)
            });
            setFilteredData({ results: filtered });

        }
    }
    useEffect(() => {
        applyFilter();
    }, [typeFilter, priorityFilter, statusFilter]);

    //Rendering
    if (!data) {
        return "Loading Issues..."
    }
    return (
        <>
            <div style={styles}>
                <div className="">
                    <p className="text-2xl font-bold">All Issues</p>
                </div>
                <div className="space-x-2 p-3">
                    Type
                    <button className="ml-3" onClick={() => setTypeFilter('problem')}>Problems</button>
                    <button className="" onClick={() => setTypeFilter('question')}>Questions</button>
                    <button className="" onClick={() => setTypeFilter('task')}>Tasks</button>
                </div>
                <div className="space-x-2 p-3">
                    Priority
                    <button className="ml-3" onClick={() => setPriorityFilter('high')}>High</button>
                    <button className="" onClick={() => setPriorityFilter('normal')}>Normal</button>
                    <button className="" onClick={() => setPriorityFilter('low')}>Low</button>
                </div>
                <div className="space-x-2 p-3">
                    Status
                    <button className="ml-3" onClick={() => setTypeFilter('problem')}>Open</button>
                    <button className="" onClick={() => setTypeFilter('pending')}>Pending</button>
                    <button className="" onClick={() => setTypeFilter('closed')}>Closed</button>
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
                    <tbody className="dividy-y divide-gray-200 bg-white">
                        {filteredData && filteredData.results.map((issue) => (
                            <tr key={issue.id}>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{issue.subject}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{issue.priority}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{issue.assignee_id}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{issue.created}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                <div>Total Issues: {data.results.length}</div>
            </div>
        </>
    )
}

const styles = {
    margin: '0 auto',
}
