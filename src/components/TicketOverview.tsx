import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { TicketProp } from "api/types"
import { Tooltip } from 'react-tooltip'

export default function TicketOverview({title, props}: {title: string, props: TicketProp[]}) {
    return (
        <>  
            <div className="mx-auto max-w-lg rounded-lg border border-gray-300 bg-white p-4">
                <h1 className="mx-auto mb-4 text-center text-2xl font-bold">{title} Overview</h1>
                <div className="flex justify-between">
                    {props.map((ticket, index) => (
                        <div key={index} className="flex items-center">
                            <FontAwesomeIcon 
                                className="mx-2" 
                                icon={ticket.icon} 
                                color={ticket.iconColour} 
                                size="3x"
                                data-tooltip-id="tic_tooltip"
                                data-tooltip-content={ticket.name}
                                data-tooltip-place="top"/>
                            <div className="mr-3 rounded-lg border border-gray-200 bg-gray-50">
                                <span className="mx-2 text-xl">{ticket.count}</span>
                            </div>
                            
                            <Tooltip id="tic_tooltip"/>
                        </div>
                    ))}
                </div>
            </div>
            
        </>
    )
}