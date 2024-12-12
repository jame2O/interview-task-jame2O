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
        
        <div className="bg-white shadow-lg p-4 rounded">
            <div className="flex justify-between">
                <h1 className="font-bold italic">Add Filters</h1>
                <button  onClick={() => {
                    setPriorityFilter('')
                    setStatusFilter('')
                    setTypeFilter('')
                }}>Clear All</button>
            </div>
            
            <div className="p-3 space-x-4">
                <p className="font-bold">Type</p>
                <button className={`ml-3 p-1 border-2 rounded-lg ${typeFilter === 'problem' ? 'p-1 border-2 border-blue-500 rounded-lg' : ''}`} onClick={() => setTypeFilter('problem')}>Problems</button>
                <button className={`ml-3 p-1 border-2 rounded-lg ${typeFilter === 'question' ? 'p-1 border-2 border-blue-500 rounded-lg' : ''}`} onClick={() => setTypeFilter('question')}>Questions</button>
                <button className={`ml-3 p-1 border-2 rounded-lg ${typeFilter === 'task' ? 'p-1 border-2 border-blue-500 rounded-lg' : ''}`} onClick={() => setTypeFilter('task')}>Tasks</button>
                <button className={`ml-3 p-1 border-2 rounded-lg ${typeFilter === '' ? 'p-1 border-2 border-blue-500 rounded-lg' : ''}`} onClick={() => setTypeFilter('')}>All</button>
            </div>
            <div className='border'/>
            <div className="p-3 space-x-4">
                <p className="font-bold">Priority</p>
                <button className={`ml-3 p-1 border-2 rounded-lg ${priorityFilter === 'high' ? 'p-1 border-2 border-blue-500 rounded-lg' : 'p-1'}`} onClick={() => setPriorityFilter('high')}>High</button>
                <button className={`ml-3 p-1 border-2 rounded-lg ${priorityFilter === 'normal' ? 'p-1 border-2 border-blue-500 rounded-lg' : 'p-1'}`} onClick={() => setPriorityFilter('normal')}>Normal</button>
                <button className={`ml-3 p-1 border-2 rounded-lg ${priorityFilter === 'low' ? 'p-1 border-2 border-blue-500 rounded-lg' : 'p-1'}`} onClick={() => setPriorityFilter('low')}>Low</button>
                <button className={`ml-3 p-1 border-2 rounded-lg ${priorityFilter === '' ? 'p-1 border-2 border-blue-500 rounded-lg' : 'p-1'}`} onClick={() => setPriorityFilter('')}>All</button>
            </div>
            <div className='border'/>
            <div className="p-3 space-x-4">
                <p className="font-bold">Status</p>
                <button className={`ml-3 p-1 border-2 rounded-lg ${statusFilter === 'open' ? 'p-1 border-2 border-blue-500 rounded-lg' : 'p-1'}`} onClick={() => setStatusFilter('open')}>Open</button>
                <button className={`ml-3 p-1 border-2 rounded-lg ${statusFilter === 'new' ? 'p-1 border-2 border-blue-500 rounded-lg' : 'p-1'}`} onClick={() => setStatusFilter('new')}>New</button>
                <button className={`ml-3 p-1 border-2 rounded-lg ${statusFilter === 'pending' ? 'p-1 border-2 border-blue-500 rounded-lg' : 'p-1'}`} onClick={() => setStatusFilter('pending')}>Pending</button>
                <button className={`ml-3 p-1 border-2 rounded-lg ${statusFilter === 'solved' ? 'p-1 border-2 border-blue-500 rounded-lg' : 'p-1'}`} onClick={() => setStatusFilter('solved')}>Solved</button>
                <button className={`ml-3 p-1 border-2 rounded-lg ${statusFilter === 'closed' ? 'p-1 border-2 border-blue-500 rounded-lg' : 'p-1'}`} onClick={() => setStatusFilter('closed')}>Closed</button>
                <button className={`ml-3 p-1 border-2 rounded-lg ${statusFilter === '' ? 'p-1 border-2 border-blue-500 rounded-lg' : 'p-1'}`} onClick={() => setStatusFilter('')}>All</button>
            </div>
        </div>
    )
}