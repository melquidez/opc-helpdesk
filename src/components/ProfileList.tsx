'use client';

import { Card, Dropdown } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";

interface UserData {
    username: string,
    user_id: number,
    user_role: string

}

const ProfileList = () =>{



    const [users, setUsers] = useState<UserData[]>([]);

    const fetchProfiles = async () =>{
        try{
            const res = await fetch('/api/users?user=all', {
                method: 'GET',
                headers: {"Content-Type": "application/json"},
            })

            if (!res.ok){
                throw new Error('Failed to get users');
            }

            const content = await res.json();
            setUsers(content);
            // return ;
        } catch(error){
            console.error('Error: ', error);
        }

    }


    useEffect(()=>{
        fetchProfiles();
    },[])

    return (
        <>
            <div className="container">
                <div className="grid grid-flow-row grid-cols-4 gap-5">
                {
                users.map((user:UserData,index:number) => (
                <Card key={index} className="max-w-sm">
                    <div className="flex justify-end px-4 pt-4">
                        <Dropdown inline label="">
                            <Dropdown.Item>
                                <Link
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                Edit
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Link
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                Export Data
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Link
                                href="#"
                                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                Delete
                                </Link>
                            </Dropdown.Item>
                        </Dropdown>
                    </div>
                    <div className="flex flex-col items-center pb-10">
                        <Image
                            alt={user.username}
                            height="96"
                            src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${user.username == 'admin' ? 'Administrator' : user.username}`}
                            width="96"
                            className="mb-3 rounded-full shadow-lg"
                        />
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white cursor-pointer">
                            <Link href={`/profile/${user.user_id}`}>
                                {user.username}
                            </Link>
                        </h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {user.user_role}
                        </span>
                        <div className="mt-4 flex space-x-3 lg:mt-6">
                            {/* <Link
                                href="#"
                                className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                            >
                                Add friend
                            </Link>
                            <Link
                                href="#"
                                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                            >
                                Message
                            </Link> */}
                        </div>
                    </div>
                </Card>
                ))}
                </div>
            </div>
        </>
    )
}


export default ProfileList
