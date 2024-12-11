import { useEffect, useState } from "react";
import { SampleData } from "api/types";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilterOptions from "./FilterOptions";
import SearchBar from "./SearchBar";
export default function PriorityIssues() {
    const [data, setData] = useState<SampleData | null>(null)
    const [filteredData, setFilteredData] = useState<SampleData | null>(null)
    const [typeFilter, setTypeFilter] = useState<string>('')
    const [statusFilter, setStatusFilter] = useState<string>('')
    const [priorityFilter, setPriorityFilter] = useState<string>('')
    const [showFilterPopup, setShowFilterPopup] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState('')
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
                    const prioritiesAsInt: any = { "low": 1, "normal": 2, "high": 3 }
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
                    && (searchInput ? issue.organization_id.includes(searchInput) : true)
            });
            setFilteredData({ results: filtered });
        }
    }
    useEffect(() => {
        applyFilter();
    }, [typeFilter, priorityFilter, statusFilter, searchInput]);

    //Rendering stuff
    if (!data) {
        return "Loading Issues..."
    }
    return (
        <>
            <div style={styles}>
                <div className="">
                    <p className="text-2xl font-bold">All Issues</p>
                </div>
                <button 
                    onClick={() => setShowFilterPopup(!showFilterPopup)}
                    className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-2 rounded">
                    <FontAwesomeIcon icon={"filter"} size="xl"/>
                    </button>
                {showFilterPopup && (
                    <div className="absolute top-12 right-0 bg-white shadow-lg p-4 rounded">
                        <FilterOptions
                            typeFilter={typeFilter}
                            setTypeFilter={setTypeFilter}
                            priorityFilter={priorityFilter}
                            setStatusFilter={setStatusFilter}
                            statusFilter={statusFilter}
                            setPriorityFilter={setPriorityFilter}
                        />
                    </div>
                )}
                <SearchBar
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}    
                />
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-grey-50">
                        <tr>
                            <th>Issue</th>
                            <th>Type</th>
                            <th>Priority</th>
                            <th>Assignee</th>
                            <th>Organiztion ID</th>
                            <th>Created On</th>
                        </tr>
                    </thead>
                    <tbody className="dividy-y divide-gray-200 bg-white">
                        {filteredData && filteredData.results.map((issue) => (
                            <tr key={issue.id}>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{issue.subject}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{issue.type}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{issue.priority}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{issue.assignee_id}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{issue.organization_id}</td>
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
