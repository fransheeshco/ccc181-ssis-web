"use client"

import { useEffect, useState } from "react"
import * as React from "react"
import { DataTable } from "@/components/ui/data-table"
import { fetchProgram } from "@/lib/ProgramApi"
import { Program, fetchProgramReponse } from "@/lib/types/programTypes"
import { AddProgramDialog } from "@/components/forms/AddProgramDialog"
import { columns } from "@/app/protected/programs/columns"
import { ProgramProvider } from "@/app/context/programContext"
import { SortingState } from "@tanstack/react-table"

export default function ProgramClient() {
  const [data, setData] = useState<Program[]>([])
  const [total, setTotal] = useState(0)
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize] = useState(10)
  const [sorting, setSorting] = useState<SortingState>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    loadData(pageIndex * pageSize)
  }, [pageIndex, sorting, search]) // 👈 re-fetch on page or sorting change

  const loadData = async (offset = 0) => {
    setLoading(true)
    try {
      const sortBy = sorting[0]?.id || "program_code"
      const orderBy = sorting[0]?.desc ? "desc" : "asc"

      const result: fetchProgramReponse = await fetchProgram({
        offset,
        limit: pageSize,
        sortBy,
        orderBy,
        search,
      })

      setData(result.programs.rows || [])
      setTotal(result.programs.total)
      setSearch(search)
    } catch (error) {
      console.error("Failed to load colleges:", error)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (newPage: number) => {
    setPageIndex(newPage) // 👈 let useEffect trigger the load
  }

  if (loading) return <div>Loading programs...</div>

  return (
    <ProgramProvider>
      <DataTable
        columns={columns(loadData)}
        data={data}
        total={total}
        pageIndex={pageIndex}
        pageSize={pageSize}
        sorting={sorting}
        onSortingChange={setSorting}
        onSearch={(q) => {
          setPageIndex(0) // reset to first page
          setSearch(q)
        }}
        onPageChange={handlePageChange}
        actions={[
          {
            Component: AddProgramDialog ,
            props: {
                label: "Add College",
                onSuccess: () => loadData(pageIndex * pageSize),
              },
          }
        ]}
      />
    </ProgramProvider>
  )
}
