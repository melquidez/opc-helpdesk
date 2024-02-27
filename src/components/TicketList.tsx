import { Badge, Dropdown, DropdownItem, Modal } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import React, { Children, ReactNode, useState } from "react";
import AcceptTicket from "./AcceptTicket";
import TicketItem from "./TicketItem";
import { Ticket } from "@/tools/Interfaces";


interface Tickets extends Ticket {
    "assigned_to_username": string
}

interface TicketListProps {
    tickets: Tickets[],
    children?: ReactNode
}

const TicketList: React.FC<TicketListProps> = ({tickets, children}) => {

    const [openModal, setOpenModal] = useState(false);

    const [selectedTicket, setSelectedTicket] = useState<Ticket | null >(null);

    const handleDoubleClick = (ticket:Ticket) => {
        setSelectedTicket(ticket)
        setOpenModal(true)
    }

    const handleStatusChange = (status: string) =>{
        if(selectedTicket){
            selectedTicket.TicketStatus_Name  = status
        }
        console.log(tickets)
        // console.log(ticket_status)
    }

    return (
        <>
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
                                        Status
                                    </th>
                                    <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-400 opacity-70"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets.map((ticket) => (
                                    <TicketItem
                                        onClick={() => handleDoubleClick(ticket)}
                                        key={ticket.ticket_id}
                                        ticket={ticket}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal
                className="z-[9999]"
                show={openModal}
                onClose={() => setOpenModal(false)}
            >
                <Modal.Header>
                    {selectedTicket?.title}
                    <div className="text-center">
                        <Badge color="yellow" size="sm"> {selectedTicket?.TicketStatus_Name}</Badge>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {selectedTicket?.description}
                        </p>
                        <div className="flex gap-2 z-1 items-center">
                            <span className="text-sm"><b>Tags:</b></span>
                            {selectedTicket?.Tags.split(',').map((tag,key)=>(
                                tag.trim().length > 0 ? <Badge key={key} color='green' size="sm">{tag.trim()}</Badge> : ''
                            ))}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {
                        selectedTicket?.TicketStatus_Name === 'In Progress' ||
                        <AcceptTicket closeModal={()=>setOpenModal(false)} ticket_id={selectedTicket?.ticket_id || 0} status_change={handleStatusChange}/>
                    }
                </Modal.Footer>
            </Modal>
        </>
    );
};


export default TicketList;
