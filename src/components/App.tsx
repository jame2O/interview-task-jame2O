import { QueryClient, QueryClientProvider } from "react-query"
import AllIssues from "./IssuesTable"
import BackendTasks from "./BackendTasks";
const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="ml-5">
                <div className='mt-5'>
                    <h1 className='mb-4 text-3xl'>Welcome to the Service Desk Dashboard!</h1>
                    
                </div>
                <div style={{textAlign: 'left'}}>
                    <AllIssues/>
                </div>
                <div>
                    <BackendTasks/>
                </div>
            </div>
        </QueryClientProvider>
    )
}



export default App
