import { useState, useEffect } from 'react';

export default function FilterOptions(
    {typeFilter,
    setTypeFilter,
    priorityFilter,
    setPriorityFilter,
    statusFilter,
    setStatusFilter}
: { typeFilter: string,
    setTypeFilter: (type: string) => void,
    priorityFilter: string
    setPriorityFilter: (priority: string) => void,
    statusFilter: string,
    setStatusFilter: (status: string) => void,
} ) {
    return (
        <div className="absolute top-16 right-16 bg-white shadow-lg p-4 rounded">
            <div className="p-3 space-x-2">
                <p className="font-bold">Type</p>
                <button className={`ml-3 ${typeFilter === 'problem' ? 'border border-blue-500' : ''}`} onClick={() => setTypeFilter('problem')}>Problems</button>
                <button className="" onClick={() => setTypeFilter('question')}>Questions</button>
                <button className="" onClick={() => setTypeFilter('task')}>Tasks</button>
                <button className="" onClick={() => setTypeFilter('')}>All</button>
            </div>
            <div className="p-3 space-x-2">
                <p className="font-bold">Priority</p>
                <button className="ml-3" onClick={() => setPriorityFilter('high')}>High</button>
                <button className="" onClick={() => setPriorityFilter('medium')}>Medium</button>
                <button className="" onClick={() => setPriorityFilter('low')}>Low</button>
                <button className="" onClick={() => setPriorityFilter('')}>All</button>
            </div>
            <div className="p-3 space-x-2">
                <p className="font-bold">Status</p>
                <button className="ml-3" onClick={() => setStatusFilter('open')}>Open</button>
                <button className="" onClick={() => setStatusFilter('pending')}>Pending</button>
                <button className="" onClick={() => setStatusFilter('closed')}>Closed / Solved</button>
                <button className="" onClick={() => setStatusFilter('')}>All</button>
            </div>
        </div>
    )
}