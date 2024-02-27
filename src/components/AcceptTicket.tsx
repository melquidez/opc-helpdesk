'use client'

import React from "react"

interface AcceptTicketProps {
    ticket_id: number
    status_change: (status: string) => void,
    closeModal?: (stats:boolean) => void
}

const AcceptTicket: React.FC<AcceptTicketProps> = ({ticket_id, status_change, closeModal}) => {

    const handleStatus = async () => {

        const res = await fetch(`/api/tickets/accept?t_id=${ticket_id}&t_stats=2`,{
            method: 'GET',
            headers: {"Content-Type": "application/json"},
        });
        console.log("Status: ", res.ok)
        status_change('In Progress')
        if(closeModal){
            closeModal(true)
        }
    }

    return (
        <>
            <span onClick={handleStatus}
                className="cursor-pointer text-xs font-semibold leading-tight text-slate-400 flex justify-between items-center"
            >
                <i className="fa fa-thumbs-up"></i>
                &nbsp; Accept

            </span>
        </>
    );
}


export default AcceptTicket;
