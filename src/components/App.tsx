import { QueryClient, QueryClientProvider } from "react-query"
import Data from "./Data"
import AllIssues from "./IssuesTable"
import BackendTasks from "./BackendTasks";
import { CSSProperties } from 'react';
const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className='p-4'>
                <h1 className='mb-4 text-3xl'>Welcome to the Service Desk Dashboard!</h1>
                
            </div>
            <div style={styles.priorityIssues}>
                <AllIssues/>
            </div>
            <div>
                <BackendTasks/>
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
