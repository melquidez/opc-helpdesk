'use client'

import AddTicketBtn from "@/components/AddTicketBtn";
import Card from "@/components/Card";
import TicketList from "@/components/TicketList";
import TicketModal from "@/components/TicketModal";
import modalState from "@/tools/modalState";
import { Spinner } from "flowbite-react";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import React, { Suspense, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const Tickets: React.FC = () => {

    const query = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();

    const { isModalOpen, openModal, closeModal } = modalState();

    const [tickets, setTickets] = useState([]);
    const [newTicket, setNewTicket] = useState(false)

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    const fetchData = async (page: number = 1) => {
        const param = new URLSearchParams(query);
        if(param){
            param.set('page',page.toString());
        } else{
            param.delete('page')
        }
        replace(`${pathName}?${param.toString()}`, { scroll:false });

        const pageNum: any = param.get('page') || page;

        try{
            const res = await fetch(`/api/tickets?page=${pageNum}`, {
                method: 'GET',
                headers: {"Content-Type": "application/json"},
            });
            const data: {
                totalTickets: number,
                totalPages: number,
                results:[]
            } = await res.json();
            setTickets(data.results)

            // const totalTicket: number = data.length;
            // const totalPages =
            setTotalPages(data.totalPages)
            setCurrentPage(pageNum);
        } catch(error){
            console.log("Error: ", error)
        }
    }
    useEffect(()=>{
        const param = new URLSearchParams(query);
        const pageNum:any  = param.get('page') || 1;
        fetchData(pageNum)
    },[]);

    const handlePageChange = ({ selected }: { selected: number }) => {
        console.log(selected)
        fetchData(selected + 1); // +1 because the library uses 0-based indexing
    };


    return (
        <>

            <div className="w-full px-6 py-6 mx-auto">
                <div className="flex flex-wrap -mx-3">
                    <Card title="Today's Ticket" count={100}/>
                    <Card title="Weekly Ticket" count={100}/>
                    <Card title="Monthly Ticket" count={100}/>
                    <Card title="Yearly Ticket" count={100}/>
                </div>

            </div>

            <div className="w-full px-6 py-6 mx-auto">
                <div className="flex flex-wrap -mx-3">
                    <div className="flex-none w-full max-w-full px-3">
                        {/* <Suspense fallback={<Spinner aria-label="Loading..."/>}>
                            <TicketList tickets={tickets} >
                                <AddTicketBtn />
                            </TicketList>
                        </Suspense> */}

                        <TicketList tickets={tickets} >
                            <AddTicketBtn />
                        </TicketList>

                        <ReactPaginate
                            breakLabel="..."
                            nextLabel=">>"
                            previousLabel="<<"
                            pageCount={totalPages}
                            pageRangeDisplayed={5}
                            // marginPagesDisplayed={1}
                            renderOnZeroPageCount={null}
                            onPageChange={handlePageChange}
                            containerClassName="container flex justify-center"
                            pageClassName=""
                            previousLinkClassName="p-5"
                            nextLinkClassName="p-5"
                            pageLinkClassName="p-5"
                            activeClassName="active bg-gray-200 font-bold"
                        />
                    </div>
                </div>
            </div>


            <div className="w-full px-6 py-6 mx-auto">
                <TicketModal data={setTickets} isOpen={isModalOpen} onClose={closeModal}/>
            </div>
        </>

    );
}


export default Tickets
