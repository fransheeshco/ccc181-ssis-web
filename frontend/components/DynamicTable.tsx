import Image from "next/image"
import Link from "next/link"
import Tabletoolbar from "@/components/Tabletoolbar"

interface DynamicTableProps {
  data: Record<string, any>[]
  headerTitle: string
  totalPages: number
  currentPage: number
  extraParams?: { [key: string]: string | string[] | undefined }
  showActions?: boolean
}

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1)

// helper for keeping filters/sorts in pagination links
const createPageLink = (
  page: number,
  params?: { [key: string]: string | string[] | undefined }
) => {
  const urlParams = new URLSearchParams()

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (key === "page") continue // overwrite with new page
      if (Array.isArray(value)) {
        value.forEach((v) => urlParams.append(key, v))
      } else if (value) {
        urlParams.set(key, value)
      }
    }
  }

  urlParams.set("page", String(page))
  return `?${urlParams.toString()}`
}

export default function DynamicTable({
  data = [],
  headerTitle,
  totalPages,
  currentPage,
  extraParams,
  showActions = true,
}: DynamicTableProps) {
  const headers = data.length > 0 ? Object.keys(data[0]) : []

  return (
    <div className="flex flex-col gap-3 w-full h-screen">
      {/* Header */}
      <header className="pl-10 pt-5 text-4xl font-semibold">
        {headerTitle}
      </header>

      {/* Toolbar */}
      <Tabletoolbar />

      {/* Table + Pagination */}
      <main className="h-full px-10">
        <div className="shadow-md sm:rounded-lg rounded-2xl h-full flex flex-col">
          {/* Table Section (fills available space) */}
          <div className="flex-grow">
            <table className="w-full text-sm text-left text-gray-600 dark:text-gray-400 h-full">
              {/* Table Head */}
              <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
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
                          <div className="flex flex-row gap-3">
                            <button className="hover:cursor-pointer">
                              <Image
                                src="/edit.png"
                                alt="Edit"
                                width={19}
                                height={19}
                              />
                            </button>
                            <button className="hover:cursor-pointer">
                              <Image
                                src="/trash.png"
                                alt="Delete"
                                width={23}
                                height={23}
                              />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
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

          {/* Pagination always at bottom */}
          <div className="flex justify-between items-center mt-auto px-6 py- pb-4">
            <Link
              href={createPageLink(currentPage - 1, extraParams)}
              className={`px-4 py-2 bg-gray-200 rounded ${
                currentPage === 1 ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              Previous
            </Link>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <Link
              href={createPageLink(currentPage + 1, extraParams)}
              className={`px-4 py-2 bg-gray-200 rounded ${
                currentPage === totalPages ? "opacity-50 pointer-events-none" : ""
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
