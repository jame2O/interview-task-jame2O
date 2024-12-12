import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function FilterOptions(
    {typeFilter,
    setTypeFilter,
    priorityFilter,
    setPriorityFilter,
    statusFilter,
    setStatusFilter,
    showFilterPopup,
    setShowFilterPopup}
: { typeFilter: string,
    setTypeFilter: (type: string) => void,
    priorityFilter: string
    setPriorityFilter: (priority: string) => void,
    statusFilter: string,
    setStatusFilter: (status: string) => void,
    showFilterPopup: boolean
    setShowFilterPopup: ((b: boolean) => void)
} ) {
    return (
        
        <div className="rounded bg-white p-4 shadow-lg">
            <div className="flex justify-between">
                <h1 className="font-bold italic">Add Filters</h1>
                <button onClick={() => setShowFilterPopup(!showFilterPopup)}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>
            
            <div className="space-x-4 p-3">
                <p className="font-bold">Type</p>
                <button className={`ml-3 rounded-lg border-2 p-1 ${typeFilter === 'problem' ? 'rounded-lg border-2 border-blue-500 p-1' : ''}`} onClick={() => setTypeFilter('problem')}>Problems</button>
                <button className={`ml-3 rounded-lg border-2 p-1 ${typeFilter === 'question' ? 'rounded-lg border-2 border-blue-500 p-1' : ''}`} onClick={() => setTypeFilter('question')}>Questions</button>
                <button className={`ml-3 rounded-lg border-2 p-1 ${typeFilter === 'task' ? 'rounded-lg border-2 border-blue-500 p-1' : ''}`} onClick={() => setTypeFilter('task')}>Tasks</button>
                <button className={`ml-3 rounded-lg border-2 p-1 ${typeFilter === '' ? 'rounded-lg border-2 border-blue-500 p-1' : ''}`} onClick={() => setTypeFilter('')}>All</button>
            </div>
            <div className='border'/>
            <div className="space-x-4 p-3">
                <p className="font-bold">Priority</p>
                <button className={`ml-3 rounded-lg border-2 p-1 ${priorityFilter === 'high' ? 'rounded-lg border-2 border-blue-500 p-1' : 'p-1'}`} onClick={() => setPriorityFilter('high')}>High</button>
                <button className={`ml-3 rounded-lg border-2 p-1 ${priorityFilter === 'normal' ? 'rounded-lg border-2 border-blue-500 p-1' : 'p-1'}`} onClick={() => setPriorityFilter('normal')}>Normal</button>
                <button className={`ml-3 rounded-lg border-2 p-1 ${priorityFilter === 'low' ? 'rounded-lg border-2 border-blue-500 p-1' : 'p-1'}`} onClick={() => setPriorityFilter('low')}>Low</button>
                <button className={`ml-3 rounded-lg border-2 p-1 ${priorityFilter === '' ? 'rounded-lg border-2 border-blue-500 p-1' : 'p-1'}`} onClick={() => setPriorityFilter('')}>All</button>
            </div>
            <div className='border'/>
            <div className="space-x-4 p-3">
                <p className="font-bold">Status</p>
                <button className={`ml-3 rounded-lg border-2 p-1 ${statusFilter === 'open' ? 'rounded-lg border-2 border-blue-500 p-1' : 'p-1'}`} onClick={() => setStatusFilter('open')}>Open</button>
                <button className={`ml-3 rounded-lg border-2 p-1 ${statusFilter === 'new' ? 'rounded-lg border-2 border-blue-500 p-1' : 'p-1'}`} onClick={() => setStatusFilter('new')}>New</button>
                <button className={`ml-3 rounded-lg border-2 p-1 ${statusFilter === 'pending' ? 'rounded-lg border-2 border-blue-500 p-1' : 'p-1'}`} onClick={() => setStatusFilter('pending')}>Pending</button>
                <button className={`ml-3 rounded-lg border-2 p-1 ${statusFilter === 'solved' ? 'rounded-lg border-2 border-blue-500 p-1' : 'p-1'}`} onClick={() => setStatusFilter('solved')}>Solved</button>
                <button className={`ml-3 rounded-lg border-2 p-1 ${statusFilter === 'closed' ? 'rounded-lg border-2 border-blue-500 p-1' : 'p-1'}`} onClick={() => setStatusFilter('closed')}>Closed</button>
                <button className={`ml-3 rounded-lg border-2 p-1 ${statusFilter === '' ? 'rounded-lg border-2 border-blue-500 p-1' : 'p-1'}`} onClick={() => setStatusFilter('')}>All</button>
            </div>
            <div className="border"/>
            <div className="mt-3">
            <button  
                onClick={() => {
                    setPriorityFilter('')
                    setStatusFilter('')
                    setTypeFilter('')
                }}
                className="ml-7 rounded-lg border-2 p-1">
                Clear All
            </button>
            </div>
            
        </div>  
    )
}