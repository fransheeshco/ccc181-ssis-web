import React from "react"
import Tabletoolbar from "./Tabletoolbar"
import Link from "next/link"

interface DynamicTableProps {
  data: Record<string, any>[]
  headerTitle: string
  page: number
  totalPages: number
  showActions?: boolean
}

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1)

const DynamicTable: React.FC<DynamicTableProps> = ({
  data = [],
  headerTitle,
  page,
  totalPages,
  showActions = true,
}) => {
  const headers = data.length > 0 ? Object.keys(data[0]) : []

  return (
    <div className="flex flex-col gap-3 w-full h-screen">
      {/* Header */}
      <header className="pl-10 pt-5 text-4xl font-semibold">
        {headerTitle}
      </header>

      {/* Toolbar */}
      <Tabletoolbar />

      {/* Table */}
      <main className="h-full px-10">
        <div className="shadow-md sm:rounded-lg rounded-2xl h-full flex flex-col">
          <div className="relative overflow-auto h-130">
            <table className="w-full text-sm text-left text-gray-600 dark:text-gray-400">
              {/* Table Head */}
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                <tr>
                  {headers.map((header) => (
                    <th key={header} scope="col" className="px-6 py-3">
                      {capitalize(header)}
                    </th>
                  ))}
                  {showActions && <th className="px-6 py-3">Actions</th>}
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {data.length > 0 ? (
                  data.map((row, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-200 dark:border-gray-700 ${
                        index % 2 === 0
                          ? "bg-gray-50 dark:bg-gray-800"
                          : "bg-white dark:bg-gray-900"
                      }`}
                    >
                      {headers.map((key) => (
                        <td
                          key={key}
                          className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap"
                        >
                          {row[key]}
                        </td>
                      ))}
                      {showActions && (
                        <td className="px-6 py-4">
                          <button className="text-blue-600 hover:underline">
                            Edit
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  // Empty State → show placeholder rows
                  <tr>
                    <td
                      colSpan={headers.length + (showActions ? 1 : 0)}
                      className="px-6 py-4 text-center text-gray-400"
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4 px-6 pb-4">
            <Link
              href={`?page=${page - 1}`}
              className={`px-4 py-2 bg-gray-200 rounded ${
                page === 1 ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              Previous
            </Link>

            <span>
              Page {page} of {totalPages}
            </span>

            <Link
              href={`?page=${page + 1}`}
              className={`px-4 py-2 bg-gray-200 rounded ${
                page === totalPages ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              Next
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default DynamicTable
