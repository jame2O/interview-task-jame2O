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

import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faCircleStop } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons/faCircleXmark";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons"
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";

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
        // Apply the filter based on filter conditions
        if (data) {
            console.log(new Date(data.results[0].due))
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

                <div className="flex justify-between mb-5">
                    <TicketOverview title="Status" props={[
                        {
                            name: "Open / New",
                            icon: faCircleInfo,
                            iconColour: "#CC0000",
                            count: openCount
                        },
                        {
                            name: "Pending / Hold",
                            icon: faCircleStop,
                            iconColour: "#FEBE10",
                            count: pendingCount
                        },
                        {
                            name: "Closed / Solved",
                            icon: faCircleCheck,
                            iconColour: "green",
                            count: closedCount
                        },
                    ]}/>
                    <TicketOverview title="Type" props={[
                        {
                            name: "Problem / Incident",
                            icon: faTriangleExclamation,
                            iconColour: '#CC0000',
                            count: problemCount
                        },
                        {
                            name: "Question",
                            icon: faQuestion,
                            iconColour: "#FEBE10",
                            count: questionCount
                        },
                        {
                            name: "Task",
                            icon: faListCheck,
                            iconColour: "#03594D",
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
                <div className="flex items-center space-x-4 mb-4">
                    <button 
                        onClick={() => setShowFilterPopup(!showFilterPopup)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg">
                        <FontAwesomeIcon icon={faFilter} size="2x"/>
                        </button>
                    {showFilterPopup && (
                        <div className="absolute  p-4 rounded">
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
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                            <tr key={issue.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
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
                                        <button className="bg-blue-500 text-white px-2 py-1 rounded">
                                            <FontAwesomeIcon icon={faCopy} />
                                        </button>
                                    </CopyToClipboard>
                                    <Tooltip id="cc_tooltip" />
                                </td>
                            </tr>
                        ))
                        ) : ( 
                            <tr>
                                <td colSpan={9} className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 font-bold">No data from selected filters.</td>
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
