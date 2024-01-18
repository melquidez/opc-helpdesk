import { Badge, Dropdown, DropdownItem } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import React, { Children, ReactNode } from "react";


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
}

interface TicketListProps {
    tickets: Ticket[],
    children?: ReactNode
}

const TicketList: React.FC<TicketListProps> = ({tickets, children}) => {
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

    return (
        <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
            <div className="p-6 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                <div className="flex flex-cols justify-between items-center">
                    <h6 className="flex justify-start">Tickets</h6>
                    <div className="flex justify-end w-1/2 max-w-full px-3 text-right">
                        {children}
                    </div>
                </div>
            </div>

            <div className="flex-auto px-0 pt-0 pb-2">
                <div className="p-0 overflow-x-auto">
                    <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                        <thead className="align-bottom">
                            <tr>
                                <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                    User
                                </th>
                                <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                    Issue
                                </th>
                                <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                    Status/Support
                                </th>
                                <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                    Date
                                </th>
                                <th className="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-400 opacity-70"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tickets.map((ticket)=>(
                                    <tr key={ticket.ticket_id}>
                                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                            <div className="flex px-2 py-1">
                                                <div>
                                                    <Image
                                                        src="/assets/img/team-1.jpg"
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

                                        <td className="p-2 text-left align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                            <p className="font-bold leading-tight my-0">
                                                {limitText(ticket.title,30)}
                                            </p>
                                            <span className="text-xs font-semibold leading-tight text-slate-400">
                                                {limitText(ticket.description,40)}
                                            </span>
                                            <span className="text-xs font-semibold leading-tight text-slate-400 flex flex-wrap gap-2">
                                                {ticket.Tags.split(',').map((name)=>(
                                                    <Badge color="teal" size='xs'>
                                                        {name}
                                                    </Badge>
                                                ))}

                                            </span>
                                        </td>

                                        <td className="p-2 text-sm leading-normal text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                            <span className="bg-gradient-to-tl from-green-600 to-lime-400 px-2.5 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white">
                                                {ticket.TicketStatus_Name}
                                            </span>
                                            <p className="mb-0 text-xs leading-tight text-slate-400">
                                                Not Assigned
                                            </p>
                                        </td>
                                        <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                            <span className="text-xs font-semibold leading-tight text-slate-400">
                                                {new Date(ticket.created_at).toISOString()}
                                            </span>
                                        </td>
                                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                            {/* <i className="fa fa-ellipsis-v"></i> */}
                                            <Dropdown label="" renderTrigger={()=>
                                                <span className="p-3 cursor-pointer">
                                                    <i className="fa fa-ellipsis-v"></i>
                                                </span>
                                            }>
                                                <DropdownItem>
                                                    <Link href={'/tickets/' + ticket.ticket_id}
                                                        className="text-xs font-semibold leading-tight text-slate-400 flex justify-between items-center"
                                                    >
                                                        <i className="fa fa-edit"></i>
                                                        &nbsp; Edit
                                                    </Link>
                                                </DropdownItem>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};


export default TicketList;
