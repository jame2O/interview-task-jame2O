import { useEffect, useState } from 'react';
import { SampleData } from "api/types";
import axios from 'axios';

export default function BackendTasks() {
    const [data, setData] = useState<any>(undefined);
    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            if (mounted) {
                try {
                    const response = await axios.get<SampleData>('/api/insights/data', {
                        params: {
                            datapoints: 500,
                            type: "",
                            priority: "",
                            status: "",
                        }
                    })
                    setData(response.data);
                } catch (error) {
                    console.error('Failed to fetch data', error);
                    return;
                }
            }
        }
        fetchData();
    }, [])
    return (
        <>
            <div>
                <a href={`/api/insights/data?datapoints=500&type=&priority=&status=`}>
                    <button>Show backend tasks</button>
                </a>
            </div>
        </>
    )
}