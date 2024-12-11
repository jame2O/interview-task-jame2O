import { useEffect, useState } from "react";
import { SampleData } from "api/types";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilterOptions from "./FilterOptions";
import SearchBar from "./SearchBar";
import TicketOverview from "./TicketOverview";

//Importing FA Icons

import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { faCircleStop } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons/faCircleXmark";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
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
    // Calculate the counts for status, 
    const openCount = filteredData?.results.filter(issue => issue.status === 'open' || issue.status === 'new').length || 0;
    const pendingCount = filteredData?.results.filter(issue => issue.status === 'pending').length || 0;
    const closedCount = filteredData?.results.filter(issue => issue.status === 'closed'  || issue.status === 'solved').length || 0;

    const problemCount = filteredData?.results.filter(issue => issue.type === 'problem').length || 0;
    const questionCount = filteredData?.results.filter(issue => issue.type === 'question').length || 0;
    const taskCount = filteredData?.results.filter(issue => issue.type === 'task').length || 0;

    const lowCount = filteredData?.results.filter(issue => issue.priority === 'low').length || 0;
    const normalCount = filteredData?.results.filter(issue => issue.priority === 'question').length || 0;
    const highCount = filteredData?.results.filter(issue => issue.priority === 'task').length || 0;
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
                <div className="flex justify-between">
                    <TicketOverview title="Status" props={[
                        {
                            name: "Open",
                            icon: faCircleInfo,
                            iconColour: "red",
                            count: openCount
                        },
                        {
                            name: "Pending",
                            icon: faCircleStop,
                            iconColour: "gold",
                            count: pendingCount
                        },
                        {
                            name: "Closed",
                            icon: faCircleCheck,
                            iconColour: "green",
                            count: closedCount
                        },
                    ]}/>
                    <TicketOverview title="Type" props={[
                        {
                            name: "Problem",
                            icon: faCircleInfo,
                            iconColour: "red",
                            count: problemCount
                        },
                        {
                            name: "Question",
                            icon: faCircleStop,
                            iconColour: "gold",
                            count: questionCount
                        },
                        {
                            name: "Task",
                            icon: faCircleCheck,
                            iconColour: "green",
                            count: taskCount
                        },
                    ]}/>
                    <TicketOverview title="Priority" props={[
                        {
                            name: "Low",
                            icon: faCircleInfo,
                            iconColour: "red",
                            count: lowCount
                        },
                        {
                            name: "Normal",
                            icon: faCircleStop,
                            iconColour: "gold",
                            count: normalCount
                        },
                        {
                            name: "High",
                            icon: faCircleCheck,
                            iconColour: "green",
                            count: highCount
                        },
                    ]}/>
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
                            <th>Status</th>
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
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{issue.status}</td>
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
