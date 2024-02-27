import { Badge, Dropdown } from "flowbite-react";
import Image from "next/image";
import AcceptTicket from "./AcceptTicket";
import Link from "next/link";
import { useState } from "react";

interface Ticket {
    "ticket_id": number,
    "title": string,
    "description": string,
    "user_id": number,
    "assigned_to": number,
    "status_id": number,
    "created_at": string,
    "updated_at": string,
    "username": string,
    "user_role": string,
    "TicketStatus_Name": string,
    "Tags": string,
    "views_count": number,
    "resolution_time": number,
    "analytics_date": string,
    "assigned_to_username": string
}

interface TicketItemProps {
    ticket: Ticket
    onClick: () => void
}

const TicketItem: React.FC<TicketItemProps> = ({ticket, onClick}) => {

     /**
     *
     * @param content string
     * @param limit number
     * @returns string
     * @description limit text to its specified limits, without breaking word.
     */
     const limitText = (content:string, limit:number): string => {
        if(content.length <= limit){
            return content
        }
        const lastWord = content.lastIndexOf(' ', limit)
        return content.substring(0, lastWord) + '...';
    }



    const [ticketData, setTicketData] = useState<Ticket>(ticket);

    const handleStatusChange = (status:string) =>{
        const ticket_status = ticket.TicketStatus_Name = status
        setTicketData(ticket)
        // console.log(ticket_status)
    }


    return (
        <>
            <tr onDoubleClick={onClick} className={(ticket.TicketStatus_Name.toLowerCase() === 'open') ? "bg-yellow-50" : ""} key={ticket.ticket_id}>
                <td className="p-2 align-middle bg-transparent whitespace-nowrap shadow-transparent">
                    <div className="flex px-2 py-1">
                        <div>
                            <Image
                                src={`https://ui-avatars.com/api/?size=1080&background=0D8ABC&color=fff&name=${ticket.username == 'admin' ? 'Administrator' : ticket.username}`}
                                className="inline-flex items-center justify-center mr-4 text-sm text-white transition-all duration-200 ease-soft-in-out h-15 w-15 rounded-xl"
                                alt="user"
                                width="50"
                                height="50"
                                />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h6 className="mb-0 text-sm leading-normal">
                                {ticket.username}
                            </h6>
                            {/* <Badge color='red' size='xs'>{ticket.user_role}</Badge> */}
                            <p className="mb-0 p-1 px-1 bg-green-400 rounded-full text-xs leading-tight text-white text-center">
                                {ticket.user_role}
                            </p>
                        </div>
                    </div>
                </td>

                <td className="p-2 text-left align-middle bg-transparent whitespace-nowrap shadow-transparent">
                    <p className="font-bold leading-tight my-0">
                        {limitText(ticket.title,30)}
                    </p>
                    <span className="text-xs font-semibold leading-tight text-slate-400">
                        {limitText(ticket.description,40)}
                    </span>
                    <span className="text-xs font-semibold leading-tight text-slate-400 flex flex-wrap gap-2">
                        {ticket.Tags.split(',').map((name, key)=>(
                            <Badge key={key} color="teal" size='xs'>
                                {name}
                            </Badge>
                        ))}

                    </span>
                </td>

                <td className="p-2 text-sm leading-normal text-center align-middle bg-transparent whitespace-nowrap shadow-transparent">
                    <span className="bg-gradient-to-tl from-green-600 to-lime-400 px-2.5 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white">
                        {ticket.TicketStatus_Name}
                    </span>
                    <p className="mb-0 text-xs leading-tight text-slate-400">
                        {ticket.assigned_to_username || 'not assigned'}
                    </p>
                </td>
                <td className="p-2 text-center align-middle bg-transparent whitespace-nowrap shadow-transparent">
                    <span className="text-xs font-semibold leading-tight text-slate-400">
                        {new Date(ticket.created_at).toISOString()}
                    </span>
                </td>
                <td className="p-2 align-middle bg-transparent whitespace-nowrap shadow-transparent">
                    {/* <i className="fa fa-ellipsis-v"></i> */}
                    <Dropdown label="" renderTrigger={()=>
                        <span className="p-3 cursor-pointer">
                            <i className="fa fa-ellipsis-v"></i>
                        </span>
                    }>
                        <Dropdown.Item>
                            <Link href={'/tickets/' + ticket.ticket_id}
                                className="text-xs font-semibold leading-tight text-slate-400 flex justify-between items-center"
                            >
                                <i className="fa fa-edit"></i>
                                &nbsp; Edit
                            </Link>
                        </Dropdown.Item>

                        {/* add condition to hide if not assigned to a staff */}
                        {
                            ticket.TicketStatus_Name === 'In Progress' ||
                            <Dropdown.Item>
                                <AcceptTicket ticket_id={ticket.ticket_id} status_change={handleStatusChange}/>
                            </Dropdown.Item>
                        }
                    </Dropdown>
                </td>
            </tr>

        </>
    );

}


export default TicketItem
