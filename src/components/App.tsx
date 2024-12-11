import { QueryClient, QueryClientProvider } from "react-query"
import Data from "./Data"
import PriorityIssues from "./PriorityIssues"

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className='p-4'>
                <h1 className='mb-4 text-3xl'>Welcome to the Service Desk!</h1>
                <PriorityIssues/>
            </div>
        </QueryClientProvider>
    )
}

const styles = {
    
} 

export default App
