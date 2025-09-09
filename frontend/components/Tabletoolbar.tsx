'use client'
import React from 'react'
import Dropdown from './Dropdown'

function Tabletoolbar() {
    return (
        <div className="flex flex-row items-center w-full px-10">
            <div className="flex gap-3">
                <img 
                    src="/leading-icon.png"
                    width={21}
                    height={21}
                    alt='search-icon'
                />
                <input type="search" placeholder="Search 1" className="p-2 w-40 h-10 text-sm bg-white rounded-2xl" />
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
