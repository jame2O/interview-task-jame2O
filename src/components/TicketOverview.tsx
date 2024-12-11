import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { TicketProp } from "api/types"
export default function TicketOverview({title, props}: {title: string, props: TicketProp[]}) {
    return (
        <>  
            <div className="border max-w-lg mx-auto p-4 border-gray-300 rounded-lg bg-white">
                <h1 className="font-bold mx-auto text-center mb-4">{title} Overview</h1>
                <div className="flex justify-between">
                    {props.map((ticket, index) => (
                        <div key={index} className="flex items-center">
                            <FontAwesomeIcon className="mx-2" icon={ticket.icon} color={ticket.iconColour} size="3x"/>
                            <span className="mx-2">{ticket.count}</span>
                        </div>
                    ))}
                </div>
            </div>
            
        </>
    )
}