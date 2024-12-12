export default function BackendTasks() {
    return (
        <>
            <div className="rounded-lg border-2 border-gray-500 bg-gray-100 p-2">
                <a href={`/api/insights/data?datapoints=500&type=&priority=&status=`}>
                    <button>Show backend tasks</button>
                </a>
            </div>
        </>
    )
}