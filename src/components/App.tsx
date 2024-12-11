import { QueryClient, QueryClientProvider } from "react-query"
import Data from "./Data"
import PriorityIssues from "./PriorityIssues"
import { CSSProperties } from 'react';
const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className='p-4'>
                <h1 className='mb-4 text-3xl'>Welcome to the Service Desk Dashboard!</h1>
                
            </div>
            <div style={styles.priorityIssues}>
                <PriorityIssues/>
            </div>

        </QueryClientProvider>
    )
}



const styles: { priorityIssues: CSSProperties } = {
    priorityIssues: {
        textAlign: 'left',
    }
} 

export default App
