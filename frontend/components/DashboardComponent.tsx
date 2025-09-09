'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import Tabletoolbar from './Tabletoolbar'

interface DynamicTableProps {
  data: Record<string, any>[]
}

const headerMap: Record<string, string> = {
  '/students': 'Student Management',
  '/colleges': 'College Management',
  '/programs': 'Program Management',
  '/dashboard': 'Dashboard'
}

const DynamicTable: React.FC<DynamicTableProps> = ({ data = [] }) => {
  const pathname = usePathname()
  const headerTitle = headerMap[pathname] || 'Dashboard'

  // Dynamically get headers
  const headers = data.length > 0 ? Object.keys(data[0]) : []

  // Dropdown state
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='flex flex-col gap-3 w-full h-screen'>
      <header className="pl-10 pt-5 text-50 font-semibold">
        {headerTitle}
      </header>

      <Tabletoolbar />

      {/* Table */}
      <main className='h-full'>
        <div className="shadow-md sm:rounded-lg px-10 pt-5 rounded-25">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
              <tr>
                {headers.map((header) => (
                  <th key={header} scope="col" className="px-6 py-3">
                    {header.charAt(0).toUpperCase() + header.slice(1)}
                  </th>
                ))}
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={index}
                  className={`border-b dark:border-gray-700 border-gray-200 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'
                    }`}
                >
                  {headers.map((key) => (
                    <td
                      key={key}
                      className="px-3 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap leading-tight"
                    >
                      {row[key]}
                    </td>
                  ))}
                  <td className="px-3 py-2 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap leading-tight">
                    Edit
                  </td>
                </tr>

              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default DynamicTable
