import { useEffect, useState } from "react";
import { SampleData } from "api/types";
import axios from 'axios';
export default function PriorityIssues() {
    const [data, setData] = useState<SampleData | null>(null)
    const [filteredData, setFilteredData] = useState<SampleData | null>(null)
    const [currentFilter, setCurrentFilter] = useState({status: '', priority: '', type: ''})
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
        if (data) {
            const filtered = data.results.filter(issue => {
                return (currentFilter.status ? issue.status === currentFilter.status : true)
                && (currentFilter.priority ? issue.priority === currentFilter.priority : true)
            });
            setFilteredData({ results: filtered });

        }
    }
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
                <div>
                    <button 
                        onClick={() => {
                            setCurrentFilter({ status: 'open', priority: 'high', type: ''});
                            applyFilter();
                        }} 
                        className="border-4">
                        Filter by</button>
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
                        {filteredData && filteredData.results.map((issue) => (
                            <tr key={issue.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{issue.subject}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{issue.priority}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{issue.assignee_id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{issue.created}</td>
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
    padding: '20px',
}