"use client"

import { useEffect, useState, useCallback } from "react"
import * as React from "react"
import { DataTable } from "@/components/ui/data-table"
import { fetchColleges } from "@/lib/CollegeApi"
import { College, fetchCollegeReponse } from "@/lib/types/collegeTypes"
import { AddCollegeDialog } from "@/components/forms/AddCollegeDialog"
import { columns } from "@/app/protected/colleges/columns"
import { CollegeProvider } from "@/app/context/collegeContext"
import { SortingState } from "@tanstack/react-table"

export default function CollegesClient() {
  const [data, setData] = useState<College[]>([])
  const [total, setTotal] = useState(0)
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize] = useState(10)
  const [sorting, setSorting] = useState<SortingState>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  // ✅ useCallback prevents stale closures and re-renders
  const loadData = useCallback(async (offset = 0) => {
    setLoading(true)
    try {
      const sortBy = sorting[0]?.id || "college_name"
      const orderBy = sorting[0]?.desc ? "desc" : "asc"

      const result: fetchCollegeReponse = await fetchColleges({
        offset,
        limit: pageSize,
        sortBy,
        orderBy,
        search,
      })

      setData(result.colleges.rows || [])
      setTotal(result.colleges.total)
    } catch (error) {
      console.error("Failed to load colleges:", error)
    } finally {
      setLoading(false)
    }
  }, [sorting, search, pageSize])

  useEffect(() => {
    loadData(pageIndex * pageSize)
  }, [pageIndex, sorting, search, loadData])

  if (loading) return <div>Loading colleges...</div>

  return (
    <CollegeProvider>
      <DataTable
        columns={columns(() => loadData(pageIndex * pageSize))}  // ✅ Pass correct refetch
        data={data}
        total={total}
        pageIndex={pageIndex}
        pageSize={pageSize}
        sorting={sorting}
        onSortingChange={setSorting}
        onSearch={(q) => {
          setPageIndex(0)
          setSearch(q)
        }}
        onPageChange={(newPage) => setPageIndex(newPage)}
        actions={[
          {
            Component: AddCollegeDialog,
            props: {
              label: "Add College",
              onSuccess: () => loadData(pageIndex * pageSize),
            },
          },
        ]}
      />
    </CollegeProvider>
  )
}
