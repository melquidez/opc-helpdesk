import React from "react";

interface CardProps {
    title: string;
    count: number;
    avg?: number;
}

const Card : React.FC<CardProps> = ({title, count, avg}) => {
    return (
        <div className="w-full max-w-full px-3 sm:w-1/2 sm:flex-none xl:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
                <div className="flex-auto p-4">
                    <div className="flex flex-row -mx-3">
                        <div className="flex-none w-2/3 max-w-full px-3">
                            <div>
                                <p className="mb-0 font-sans text-sm font-semibold leading-normal">{title || 'No Title'}</p>
                                <h5 className="mb-0 font-bold">
                                    {count || 0}
                                    <span className="text-sm leading-normal font-weight-bolder text-lime-500">+5%</span>
                                </h5>
                            </div>
                        </div>
                        <div className="px-3 text-right basis-1/3">
                            <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500">
                            <i className="ni leading-none ni-cart text-lg relative top-3.5 text-white"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Card;
