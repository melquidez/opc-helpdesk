

'use client'
// import { userInfo } from "@/tools/auth";
import modalState from "@/tools/modalState";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Badge, Dropdown } from "flowbite-react";


// interface ModalProps {
//     data?: any
//     isOpen?: boolean
//     onClose?: ()=> void;
// }

interface FormData {
    ticket_id:number | string,
    title: string,
    description: string,
    status_id:number | string,
    ticketstatusname: string
    tag_name: string,
    tag_id: string,
    assigned_to: number
}

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
    "Tags_ID": string,
    "views_count": number,
    "resolution_time": number,
    "analytics_date": string,
}


interface Users {
    username: string,
    user_role: string,
    user_id: number
}

const UpdateTicketForm = ({ params }: { params: { id: string } }) => {



    const { back } = useRouter()


    // const ticketData: Ticket = JSON.parse(atob(params.id)); // base64
    // console.log(ticketData)



    const [formData, setFormData] = useState<FormData>({
        ticket_id: 0,
        title: '',
        description: '',
        status_id: 0,
        ticketstatusname: '',
        tag_name: 'Network',
        tag_id: '1',
        assigned_to: 0
    })

    const [users, setUsers] = useState<Users[]>([])

    const [selectedUser, setSelectedUser] = useState('');


    const ticketData = async () => {
        const res = await fetch(`/api/tickets?id=${params.id}`,{
            method:'get',
            headers: {"Content-Type": "application/json"},
        })
        const data: Ticket = await res.json()
        setFormData({
            ticket_id: data.ticket_id,
            title: data.title,
            description: data.description,
            status_id: data.status_id,
            ticketstatusname: data.TicketStatus_Name,
            tag_name: data.Tags,
            tag_id: data.Tags_ID,
            assigned_to: data.assigned_to
        })

        const user_res = await fetch('/api/users',{
            method: 'get',
            headers: {"Content-Type": "application/json"},
        });

        const usersData = await user_res.json();

        usersData.forEach(element => {
            if(data.assigned_to === element.user_id){
                setSelectedUser(element.username)
            }
        });
        setUsers(usersData)



    }


    useEffect(()=>{
        ticketData();
    },[])




    const [errors,setErrors] = useState<Partial<FormData>>({});

    const changes = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setFormData((prevData) => (
            { ...prevData, [event.target.name]: event.target.value }
        ));
        setErrors({});
    }


    const validate = ()=>{
        const newErrors: Partial<FormData> = {}

        if(formData.title.trim() === ''){
            newErrors.title = 'Title is required!';
        }else if(formData.title.length < 5){
            newErrors.title = 'Title must be at least 5 characters long.'
        }

        if(formData.description.trim() === ''){
            newErrors.description = 'Please describe the issues.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }


    const formSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(validate()){
            // console.log(formData)
            const result = await fetch('/api/tickets',{
                method:"PUT",
                headers: {"Content-Type": "application/json"},
                body:JSON.stringify(formData)
            }).then(async (res)=>{
                closeForm();
                console.log("Response: ",res);
            }).catch((error)=>{
                console.log('Error:', error)
            })

            console.log("Result: ", result);
        }

    }

    const closeForm = ()=>{
        back();
    }

    return (
        <div>
            <div className="fixed py-12 bg-gray-700 transition duration-150 ease-in-out z-[99999] top-0 right-0 bottom-0 left-0" id="modal">
                <div role="alert" className="container mx-auto w-1/2">
                    <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                        <div className="w-full flex justify-start content-center text-gray-600 mb-3">
                            <svg className="w-7 h-7 text-gray-600 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 19H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2v4M6 1v4a1 1 0 0 1-1 1H1m11 8h4m-2 2v-4m5 2a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"/>
                            </svg>
                            <h5 className="text-gray-600 font-bold tracking-normal leading-tight mb-4 px-2">Update Ticket#{formData.ticket_id}</h5>
                        </div>
                        <hr className="bg-gray-400 w-full h-[2px]"/>
                        <form onSubmit={formSubmit}>

                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <input type="hidden" value={formData.ticket_id} name="ticket_id" readOnly/>
                                    <div className="relative z-0">
                                        <input type="text" name="title" value={formData.title} onChange={changes} id="title" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                        <label htmlFor="title" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Ticket title</label>
                                    </div>
                                    { errors.title && <p id="standard_error_help" className="mt-2 text-xs text-red-600 dark:text-red-400">{errors.title}</p>}
                                </div>
                                <div>
                                    <div className="relative z-0">
                                        <textarea name="description" value={formData.description} onChange={changes} id="concern" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " >
                                        </textarea>
                                        <label htmlFor="concern" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Concern</label>
                                    </div>
                                    { errors.description && <p id="standard_error_help" className="mt-2 text-xs text-red-600 dark:text-red-400">{errors.description}</p>}
                                </div>

                                <div className="mb-5">
                                    <div className="relative z-0">
                                        {/* <input type="text" name="title" value={formData.title} onChange={changes} id="title" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " /> */}
                                        <Dropdown label="Status" size="sm" inline dismissOnClick={true}
                                            renderTrigger={()=>
                                                <input type="text" name="status" value={formData.ticketstatusname} onChange={changes} id="status" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                        }>
                                            <Dropdown.Item onClick={()=>{formData.status_id = 1; formData.ticketstatusname= 'Open'}}>Open</Dropdown.Item>
                                            <Dropdown.Item onClick={()=>{formData.status_id = 2; formData.ticketstatusname= 'In Progress'}}>In Progress</Dropdown.Item>
                                            <Dropdown.Item onClick={()=>{formData.status_id = 3; formData.ticketstatusname= 'Closed'}}>Closed</Dropdown.Item>
                                        </Dropdown>
                                        <label htmlFor="status" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Status</label>
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <div className="relative z-0">
                                        <input autoComplete="false" type="text" value={formData.tag_name} onChange={changes} name="tag_name" id="tags" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                        <label htmlFor="tags" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Categories</label>
                                    </div>
                                    <div className="flex gap-2">
                                        {formData.tag_name.split(',').map((tag,key)=>(
                                            tag.trim().length > 0 ? <Badge key={key} color='yellow' size="sm">{tag.trim()}</Badge> : ''
                                        ))}
                                    </div>
                                </div>


                                <div className="mb-5">
                                    <div className="relative z-0">
                                        <Dropdown label="Status" size="sm" inline dismissOnClick={true}
                                                renderTrigger={()=>
                                            <input autoComplete="false" type="text" value={selectedUser} onChange={changes} name="assigned_to_user" id="assigned_to" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                        }>
                                            {
                                                users.map(user=>(
                                                    user.user_role === 'IT Staff' ?
                                                    <Dropdown.Item key={user.user_id} onClick={()=>{formData.assigned_to = user.user_id; setSelectedUser(user.username)}}>{user.username}</Dropdown.Item> :
                                                    ''
                                                ))
                                            }
                                            <input type="hidden" value={formData.assigned_to} name="assigned_to"/>
                                        </Dropdown>
                                        <label htmlFor="assigned_to" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Assign to</label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-start w-full">
                                <button type="submit" className=" content-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 py-2 text-sm">
                                    <svg className="w-4 h-4 text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"/>
                                    </svg>
                                    <span>Submit</span>
                                </button>
                                {/* <button className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm">Cancel</button> */}
                            </div>
                        </form>

                        <button onClick={closeForm} type="button" className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded " aria-label="close modal" role="button">
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateTicketForm;
