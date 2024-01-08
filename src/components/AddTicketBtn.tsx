import Link from "next/link";
import React, { useState } from "react";

// interface AddTicketBtnProps {
//     newTicket?: (isOpen: boolean) => void
// }

const AddTicketBtn: React.FC = () => {

    // const openModal = ()=>{
    //     newTicket(true);
    // }

    return (
        <>
            <Link href="/tickets/new" className="inline-block px-3 py-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent rounded-lg cursor-pointer leading-pro text-xs ease-soft-in shadow-soft-md bg-150 bg-gradient-to-tl from-gray-900 to-slate-800 hover:shadow-soft-xs active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25">
                <i className="fa fa-plus"></i>
            </Link>
            {/* <button onClick={openModal} type="button" className="inline-block px-3 py-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent rounded-lg cursor-pointer leading-pro text-xs ease-soft-in shadow-soft-md bg-150 bg-gradient-to-tl from-gray-900 to-slate-800 hover:shadow-soft-xs active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25">
                <i className="fas fa-plus"></i>
            </button> */}
        </>

    )
}


export default AddTicketBtn;
