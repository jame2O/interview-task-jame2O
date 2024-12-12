import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { TicketProp } from "api/types"
import { Tooltip } from 'react-tooltip'

export default function TicketOverview({title, props}: {title: string, props: TicketProp[]}) {
    return (
        <>  
            <div className="border max-w-lg mx-auto p-4 border-gray-300 rounded-lg bg-white">
                <h1 className="font-bold mx-auto text-2xl italic text-center mb-4">{title} Overview</h1>
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
                            <div className="border border-gray-200 rounded-lg bg-gray-50 mr-3">
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