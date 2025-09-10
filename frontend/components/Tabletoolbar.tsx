'use client'
import React from 'react'
import Dropdown from './Dropdown'

function Tabletoolbar() {
    return (
        <div className="flex flex-row items-center w-full px-10">
            <div className="flex gap-3">
                <div className="relative w-72">
                    {/* Search icon on the left */}
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </span>

                    {/* Input field */}
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full h-10 pl-10 pr-20 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-0"                        
                        placeholder="Search..."
                        required
                    />
                    {/* Button inside input */}
                    <button
                        type="submit"
                        className="absolute right-1 top-1 bottom-1 px-3 text-sm font-medium text-white bg-blue-700 rounded-md 
               hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
               dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Search
                    </button>
                </div>
                <Dropdown label="Filter By" items={['Dashboard', 'Settings', 'Earnings', 'Sign out']} />
            </div>
            <div className="flex flex-row w-full justify-end gap-3">
                <button className='flex items-center gap-2 w-30 h-10 bg-blue-700 rounded-2xl text-white px-3'>
                    <img
                        src="/Download.png"
                        width={25}
                        height={25}
                        className="object-contain"
                        alt="download-icon"
                    />
                    Export</button>
                <button className='flex items-center gap-2 w-37 h-10 bg-blue-700 rounded-2xl text-white px-3'>
                    <img
                        src="/addd.png"
                        width={21}
                        height={21}
                        className="object-contain"
                        alt="add-icon"
                    />
                    Add Colllege</button>
            </div>
        </div>
    )
}

export default Tabletoolbar
