
'use client'

import Image from "next/image";
import { useEffect, useState } from "react";


interface ProfileInfo {
    username: string,
    user_id: number,
    user_role: string,
    first_name: string,
    last_name: string,
    email:string,
    phone:string,
}

const UserProfile = ( {params}: {params: {id:string}} ) =>{

    const [userProfile, setUserProfile] = useState<ProfileInfo>({
        user_id:0,
        user_role:'',
        username: '',
        first_name: '',
        last_name: '',
        phone:'',
        email: ''
    })

    const fetchUserData = async () => {
        const res = await fetch(`/api//users?id=${params.id}`, {
            method: 'GET',
            headers: {"Content-Type": "application/json"},
        })

        const data = await res.json()
        setUserProfile(data)

    }

    useEffect(()=>{
        fetchUserData();
    }, [])


    return (
        <>
            <div className="h-full bg-gray-200 p-8">
                <div className="bg-white rounded-lg shadow-xl pb-8">
                    <div className="absolute right-12 mt-4 rounded">
                        <button
                            className="border border-gray-400 p-2 rounded text-gray-300 hover:text-gray-300 bg-gray-100 bg-opacity-10 hover:bg-opacity-20"
                            title="Settings"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                ></path>
                            </svg>
                        </button>
                        <div className="bg-white absolute right-0 w-40 py-2 mt-1 border border-gray-200 shadow-2xl invisible">
                            <div className="py-2 border-b">
                                <p className="text-gray-400 text-xs px-6 uppercase mb-1">
                                    Settings
                                </p>
                                <button className="w-full flex items-center px-6 py-1.5 space-x-2 hover:bg-gray-200">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                        ></path>
                                    </svg>
                                    <span className="text-sm text-gray-700">
                                        Share Profile
                                    </span>
                                </button>
                                <button className="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                                        ></path>
                                    </svg>
                                    <span className="text-sm text-gray-700">
                                        Block User
                                    </span>
                                </button>
                                <button className="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        ></path>
                                    </svg>
                                    <span className="text-sm text-gray-700">
                                        More Info
                                    </span>
                                </button>
                            </div>
                            <div className="py-2">
                                <p className="text-gray-400 text-xs px-6 uppercase mb-1">
                                    Feedback
                                </p>
                                <button className="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                        ></path>
                                    </svg>
                                    <span className="text-sm text-gray-700">
                                        Report
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[250px]">
                        <img
                            src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
                            className="w-full h-full rounded-tl-lg rounded-tr-lg"
                        />
                    </div>
                    <div className="flex flex-col items-center -mt-20">
                        <Image
                            src={`https://ui-avatars.com/api/?size=1080&background=0D8ABC&color=fff&name=${
                                userProfile.username == "admin"
                                    ? "Administrator"
                                    : userProfile.username
                            }`}
                            width={90}
                            height={90}
                            alt="User Profile"
                            className="w-40 border-4 border-white rounded-full"
                        />
                        <div className="flex items-center space-x-2 mt-2">
                            <p className="text-2xl">
                                {userProfile.first_name +
                                    " " +
                                    userProfile.last_name}
                            </p>
                        </div>
                        <p className="text-gray-700">{userProfile.user_role}</p>
                        {/* <p className="text-sm text-gray-500">New York, USA</p> */}
                    </div>
                    <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
                        <div className="flex items-center space-x-4 mt-2">
                            {/* <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                                </svg>
                                <span>Connect</span>
                            </button>
                            <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd"></path>
                                </svg>
                                <span>Message</span>
                            </button> */}
                        </div>
                    </div>
                </div>

                <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
                    <div className="w-full flex flex-col 2xl:w-1/3">
                        <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                            <h4 className="text-xl text-gray-900 font-bold">
                                Personal Info
                            </h4>
                            <ul className="mt-2 text-gray-700">
                                <li className="flex border-y py-2">
                                    <span className="font-bold w-24">
                                        Username:
                                    </span>
                                    <span className="text-gray-700">
                                        {userProfile.username}
                                    </span>
                                </li>
                                <li className="flex border-y py-2">
                                    <span className="font-bold w-24">
                                        Full name:
                                    </span>
                                    <span className="text-gray-700">
                                        {userProfile.first_name +
                                            " " +
                                            userProfile.last_name}
                                    </span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-24">
                                        Mobile:
                                    </span>
                                    <span className="text-gray-700">
                                        {userProfile.phone}
                                    </span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-24">
                                        Email:
                                    </span>
                                    <span className="text-gray-700">
                                        {userProfile.email}
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Activity Log */}
                        <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                            <h4 className="text-xl text-gray-900 font-bold">
                                Activity log
                            </h4>
                            <div className="relative px-4">
                                <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>

                                {/* <!-- start::Timeline item --> */}
                                <div className="flex items-center w-full my-6 -ml-1.5">
                                    <div className="w-1/12 z-10">
                                        <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                                    </div>
                                    <div className="w-11/12">
                                        <p className="text-sm">
                                            Profile informations changed.
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            3 min ago
                                        </p>
                                    </div>
                                </div>
                                {/* <!-- end::Timeline item --> */}
                            </div>
                        </div>
                    </div>

                    {/* About */}
                    <div className="flex flex-col w-full 2xl:w-2/3">
                        <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                            <h4 className="text-xl text-gray-900 font-bold">
                                About
                            </h4>
                            <p className="mt-2 text-gray-700">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Nesciunt voluptates obcaecati
                                numquam error et ut fugiat asperiores. Sunt
                                nulla ad incidunt laboriosam, laudantium est
                                unde natus cum numquam, neque facere. Lorem
                                ipsum dolor sit amet consectetur adipisicing
                                elit. Ut, magni odio magnam commodi sunt ipsum
                                eum! Voluptas eveniet aperiam at maxime, iste id
                                dicta autem odio laudantium eligendi commodi
                                distinctio!
                            </p>
                        </div>
                        <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                            <h4 className="text-xl text-gray-900 font-bold">
                                Statistics
                            </h4>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
                                <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-sm text-indigo-600">
                                            Total Revenue
                                        </span>
                                        <span className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">
                                            7 days
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between mt-6">
                                        <div>
                                            <svg
                                                className="w-12 h-12 p-2.5 bg-indigo-400 bg-opacity-20 rounded-full text-indigo-600 border border-indigo-600"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1"
                                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                ></path>
                                            </svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-end">
                                                <span className="text-2xl 2xl:text-3xl font-bold">
                                                    $8,141
                                                </span>
                                                <div className="flex items-center ml-2 mb-1">
                                                    <svg
                                                        className="w-5 h-5 text-green-500"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                                        ></path>
                                                    </svg>
                                                    <span className="font-bold text-sm text-gray-500 ml-0.5">
                                                        3%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-sm text-green-600">
                                            New Orders
                                        </span>
                                        <span className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">
                                            7 days
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between mt-6">
                                        <div>
                                            <svg
                                                className="w-12 h-12 p-2.5 bg-green-400 bg-opacity-20 rounded-full text-green-600 border border-green-600"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1"
                                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                                ></path>
                                            </svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-end">
                                                <span className="text-2xl 2xl:text-3xl font-bold">
                                                    217
                                                </span>
                                                <div className="flex items-center ml-2 mb-1">
                                                    <svg
                                                        className="w-5 h-5 text-green-500"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                                        ></path>
                                                    </svg>
                                                    <span className="font-bold text-sm text-gray-500 ml-0.5">
                                                        5%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-sm text-blue-600">
                                            New Connections
                                        </span>
                                        <span className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">
                                            7 days
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between mt-6">
                                        <div>
                                            <svg
                                                className="w-12 h-12 p-2.5 bg-blue-400 bg-opacity-20 rounded-full text-blue-600 border border-blue-600"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1"
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                ></path>
                                            </svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-end">
                                                <span className="text-2xl 2xl:text-3xl font-bold">
                                                    54
                                                </span>
                                                <div className="flex items-center ml-2 mb-1">
                                                    <svg
                                                        className="w-5 h-5 text-green-500"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                                        ></path>
                                                    </svg>
                                                    <span className="font-bold text-sm text-gray-500 ml-0.5">
                                                        7%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4"></div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <div className="flex items-center justify-between">
                        <h4 className="text-xl text-gray-900 font-bold">
                            Connections (532)
                        </h4>
                        <a href="#" title="View All">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-500 hover:text-gray-700"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                ></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}


export default UserProfile

