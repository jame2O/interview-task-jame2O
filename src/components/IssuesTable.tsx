import { useEffect, useState } from "react";
import { SampleData } from "api/types";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilterOptions from "./FilterOptions";
import SearchBar from "./SearchBar";
import TicketOverview from "./TicketOverview";
import {CopyToClipboard} from 'react-copy-to-clipboard'
import { Tooltip } from 'react-tooltip'
//Importing FA Icons

import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faCircleStop } from "@fortawesome/free-solid-svg-icons";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

export default function IssuesTable() {
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
                    // Do sorting here
                    const prioritiesAsInt: {"low": number, "normal": number, "high": number} = { "low": 1, "normal": 2, "high": 3 }
                    const sortedData = {
                        ...allData,
                        results: allData.results.sort((a, b) => prioritiesAsInt[a.priority as keyof typeof prioritiesAsInt] - prioritiesAsInt[b.priority as keyof typeof prioritiesAsInt]).reverse()
                    }
                    setData(sortedData)
                    //By default, filtered data just contains all of the sorted data.
                    setFilteredData(sortedData)
                }
            } catch (error) {
                // Hopefully this doesn't happen
                console.error('Failed to fetch data', error);
            }
        }
        fetchData();
        //Cleanup on unmount                             
        return () => { mounted = false; }
    }, [])
    const applyFilter = () => {
        // Apply the filter based on filter conditions
        if (data) {
            const filtered = data.results.filter(issue => {
                return (typeFilter ? issue.type === typeFilter : true) // Type checks
                    && (priorityFilter ? issue.priority === priorityFilter : true) //Priority checks
                    && (statusFilter ? issue.status === statusFilter : true) // Status checks
                    && (searchInput ? issue.organization_id.toLowerCase().includes(searchInput.toLowerCase()) : true) // Search Bar (org id) checks
            });
            setFilteredData({ results: filtered }); //Update the f.data state once were done
        }
    }
    // Checks if any of the filters have been changed, then applies the new filter 
    useEffect(() => {
        let mounted = true;
        if (mounted) {
            applyFilter();
        }
        //Cleanup on unmount
        return () => { mounted = false; }
    }, [typeFilter, priorityFilter, statusFilter, searchInput]);

    // Calculate the counts for status (probably could have done this better)
    // Status counts
    const openCount = filteredData?.results.filter(issue => issue.status === 'open' || issue.status === 'new').length || 0;
    const pendingCount = filteredData?.results.filter(issue => issue.status === 'pending' || issue.status === "hold").length || 0;
    const closedCount = filteredData?.results.filter(issue => issue.status === 'closed'  || issue.status === 'solved').length || 0;
    // Type counts
    const problemCount = filteredData?.results.filter(issue => issue.type === 'problem' || issue.type === 'incident').length || 0;
    const questionCount = filteredData?.results.filter(issue => issue.type === 'question').length || 0;
    const taskCount = filteredData?.results.filter(issue => issue.type === 'task').length || 0;
    // Priority counts
    const lowCount = filteredData?.results.filter(issue => issue.priority === 'low').length || 0;
    const normalCount = filteredData?.results.filter(issue => issue.priority === 'normal').length || 0;
    const highCount = filteredData?.results.filter(issue => issue.priority === 'high').length || 0;
    // Satisfaction score counts
    const goodCount = filteredData?.results.filter(issue => issue.satisfaction_rating.score === 'good').length || 0;
    const badCount = filteredData?.results.filter(issue => issue.satisfaction_rating.score === 'bad').length || 0;

    const capitalise = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    //Case function for determining colour of priority column values in table
    const getPriorityColour = (priority: string) => {
        switch (priority) {
            case 'low':
                return 'text-green-500'
            case 'normal':
                return 'text-yellow-500'
            case 'high':
                return 'text-red-500'
            default:
                return 'text-gray-500'
        }
    }
    //Rendering
    if (!data) {
        return "Loading Issues..."
    }
    return (
        <>
            <div style={styles}>

                <div className="mb-5 flex justify-between">
                    <TicketOverview title="Status" props={[
                        {
                            name: "Open / New",
                            icon: faCirclePlus,
                            iconColour: "#1B1B1B",
                            count: openCount
                        },
                        {
                            name: "Pending / Hold",
                            icon: faCircleStop,
                            iconColour: "#1B1B1B",
                            count: pendingCount
                        },
                        {
                            name: "Closed / Solved",
                            icon: faCircleCheck,
                            iconColour: "#1B1B1B",
                            count: closedCount
                        },
                    ]}/>
                    <TicketOverview title="Type" props={[
                        {
                            name: "Problem / Incident",
                            icon: faTriangleExclamation,
                            iconColour: '#1B1B1B',
                            count: problemCount
                        },
                        {
                            name: "Question",
                            icon: faQuestion,
                            iconColour: "#1B1B1B",
                            count: questionCount
                        },
                        {
                            name: "Task",
                            icon: faListCheck,
                            iconColour: "#1B1B1B",
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
                            iconColour: "#FEBE10",
                            count: normalCount
                        },
                        {
                            name: "High",
                            icon: faCircleExclamation,
                            iconColour: "#CC0000",
                            count: highCount
                        },
                    ]}/>
                    <TicketOverview title="Satisfaction Rating" props={[
                        {
                            name: "Good",
                            icon: faThumbsUp,
                            iconColour: "green",
                            count: goodCount
                        },
                        {
                            name: "Bad",
                            icon: faThumbsDown,
                            iconColour: "#CC0000",
                            count: badCount
                        },
                    ]}/>
                </div>
                <div className="mb-4 flex items-center space-x-4">
                    <button 
                        onClick={() => setShowFilterPopup(!showFilterPopup)}
                        className="rounded-lg bg-blue-500 px-3 py-1 text-white">
                        <FontAwesomeIcon icon={faFilter} size="2x"/>
                        </button>
                    {showFilterPopup && (
                        <div className="absolute top-4 rounded p-4">
                            <FilterOptions
                                typeFilter={typeFilter}
                                setTypeFilter={setTypeFilter}
                                priorityFilter={priorityFilter}
                                setStatusFilter={setStatusFilter}
                                statusFilter={statusFilter}
                                setPriorityFilter={setPriorityFilter}
                                setShowFilterPopup={setShowFilterPopup}
                                showFilterPopup={showFilterPopup}
                            />
                        </div>
                    )}
                    <SearchBar
                        searchInput={searchInput}
                        setSearchInput={setSearchInput}    
                    />
                </div>
                <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                    <thead className="bg-gray-50 text-sm uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3">{`Issue (Total: ${filteredData?.results.length})`}</th>
                            <th className="px-6 py-3">Type</th>
                            <th className="px-6 py-3">Priority</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Assignee</th>
                            <th className="px-6 py-3">Organiztion ID</th>
                            <th className="px-6 py-3">Satisfaction Rating</th>
                            <th className="px-6 py-3">Date Created</th>
                            <th className="px-6 py-3">Date Due</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData && filteredData.results.length > 0 ? (
                            filteredData.results.map((issue) => (
                            <tr key={issue.id} className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                                <td className="px-6 py-4">{capitalise(issue.subject)}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{capitalise(issue.type)}</td>
                                <td className={`whitespace-nowrap px-6 py-4 text-sm font-bold ${getPriorityColour(issue.priority)}`}>{capitalise(issue.priority)}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{capitalise(issue.status)}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{capitalise(issue.assignee_id)}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{capitalise(issue.organization_id)}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{capitalise(issue.satisfaction_rating.score)}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{(issue.created)}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{(issue.due)}</td>
                                <td className="px-6 py-4">
                                    <CopyToClipboard 
                                        data-tooltip-id="cc_tooltip" 
                                        data-tooltip-content="Copy to Clipboard"
                                        data-tooltip-place="top" 
                                        text={`Subject: ${issue.subject}, 
                                            Type: ${issue.type}, 
                                            Priority: ${issue.priority}, 
                                            Status: ${issue.status}, 
                                            Assignee ID: ${issue.assignee_id}, 
                                            Organization ID: ${issue.organization_id}, 
                                            Date created:${issue.created}
                                            Due Date: ${issue.due}`}
    
                                        >
                                        <button className="rounded bg-blue-500 px-2 py-1 text-white">
                                            <FontAwesomeIcon icon={faCopy} />
                                        </button>
                                    </CopyToClipboard>
                                    <Tooltip id="cc_tooltip" />
                                </td>
                            </tr>
                        ))
                        ) : ( 
                            <tr>
                                <td colSpan={9} className="whitespace-nowrap px-6 py-4 text-sm font-bold text-gray-500">No data from selected filters.</td>
                            </tr>
                        )}

                    </tbody>
                    <tfoot>
                        
                    </tfoot>
                </table>
            </div>
        </>
    )
}

const styles = {
    margin: '0 auto',
}
