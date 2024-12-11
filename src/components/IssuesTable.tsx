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
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";

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

    const capitalise = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    //Rendering stuff
    if (!data) {
        return "Loading Issues..."
    }
    return (
        <>
            <div style={styles}>

                <div className="flex justify-between mb-5">
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
                            icon: faCircleXmark,
                            iconColour: "red",
                            count: problemCount
                        },
                        {
                            name: "Question",
                            icon: faCircleQuestion,
                            iconColour: "gold",
                            count: questionCount
                        },
                        {
                            name: "Task",
                            icon: faListCheck,
                            iconColour: "",
                            count: taskCount
                        },
                    ]}/>
                    <TicketOverview title="Priority" props={[
                        {
                            name: "Low",
                            icon: faCircleExclamation,
                            iconColour: "green",
                            count: lowCount
                        },
                        {
                            name: "Normal",
                            icon: faCircleExclamation,
                            iconColour: "gold",
                            count: normalCount
                        },
                        {
                            name: "High",
                            icon: faCircleExclamation,
                            iconColour: "red",
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
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3">Issue</th>
                            <th className="px-6 py-3">Type</th>
                            <th className="px-6 py-3">Priority</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Assignee</th>
                            <th className="px-6 py-3">Organiztion ID</th>
                            <th className="px-6 py-3">Created On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData && filteredData.results.map((issue) => (
                            <tr key={issue.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4">{capitalise(issue.subject)}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{capitalise(issue.type)}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 font-bold">{capitalise(issue.priority)}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{capitalise(issue.status)}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{capitalise(issue.assignee_id)}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{capitalise(issue.organization_id)}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{capitalise(issue.created)}</td>
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
