import { backend_tasks } from '../utils/backendtasks'
import { useEffect, useState } from 'react';
export default function BackendTasks() {
    const [data, setData] = useState<string | undefined>(undefined);
    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            if (mounted) {
                let response = await backend_tasks()
                setData(response)
            }
        }
        fetchData();
    }, [])
    return (
        <>
            <div>
                Result of backend tasks (500 datapoints):
            </div>
            <pre className="text-sm">{data}</pre>
        </>
    )
}