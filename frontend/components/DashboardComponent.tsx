'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

interface DynamicTableProps {
  data: Record<string, any>[] // array of objects
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

  // Dynamically get headers from the first object keys
  const headers = data.length > 0 ? Object.keys(data[0]) : []

  return (
    <div className='flex flex-col gap-3 w-full h-screen'>
      <header className="pl-10 pt-5 text-6xl font-semibold">
        {headerTitle}
      </header>

      <section className='flex flex-row'>
        <div className="flex flex-row items-center w-full px-10 pt-5">
          <div className='flex flex-row justify-start gap-3'>
            <input
              type="search"
              placeholder="Search 1"
              className="p-2.5 w-40 text-sm bg-white rounded-2xl"
            />
            <input
              type="search"
              placeholder="Search 2"
              className="p-2.5 w-40 text-sm bg-white rounded-2xl"
            />
          </div>
          <div className='flex flex-row w-full justify-end gap-3'>
            <input
              type="search"
              placeholder="Search 3"
              className="p-2.5 w-40 text-sm bg-white rounded-2xl"
            />
            <input
              type="search"
              placeholder="Search 4"
              className="p-2.5 w-40 text-sm bg-white rounded-2xl"
            />
          </div>
        </div>
      </section>

      <main className='h-full'>
        <div className=" shadow-md sm:rounded-lg px-10 pt-5 h-full rounded-25">
          <table className="w-full h-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                  className={`h-16 border-b dark:border-gray-700 border-gray-200 ${
                    index % 2 === 0
                      ? 'bg-gray-50 dark:bg-gray-800'
                      : 'bg-white dark:bg-gray-900'
                  }`}
                >
                  {headers.map((key) => (
                    <td
                      key={key}
                      className="px-6 py-1 h-1 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      {row[key]}
                    </td>
                  ))}
                  <td className='px-6 py-1 h-1 font-medium text-gray-900 dark:text-white whitespace-nowrap'>Edit</td>
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
