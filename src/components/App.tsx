import { QueryClient, QueryClientProvider } from "react-query"
import AllIssues from "./IssuesTable"
import BackendTasks from "./BackendTasks";
const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="ml-5">
                <div className='mt-5 flex items-center space-x-5 justify-between'>
                    <div className='flex items-center'>
                        <a href="https://squaredup.com/">
                            <img 
                                src="https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_ba40e25e98795dfb9747dedaa1a7a08f/squaredup-squaredup.png"
                                width={75}
                                />                            
                        </a>
                        <h1 className='mb-4 text-3xl'>Welcome to the Service Desk Dashboard!</h1>
                    </div>
                    <div className="mr-5">
                        <BackendTasks/>
                    </div>
                </div>
                <div className="mt-5" style={{textAlign: 'left'}}>
                    <AllIssues/>
                </div>
            </div>
        </QueryClientProvider>
    )
}



export default App
