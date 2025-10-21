"use client"

import { useEffect, useState } from "react"
import * as React from "react"
import { DataTable } from "@/components/ui/data-table"
import { fetchStudents } from "@/lib/StudentApi"
import { Student, fetchStudentReponse } from "@/lib/types/studentType"
import { AddStudentDialog } from "@/components/forms/AddStudentDialogue"
import { columns } from "@/app/protected/students/columns"
import { StudentProvider } from "@/app/context/studentContext"
import { SortingState } from "@tanstack/react-table"

export default function StudentClient() {
  const [data, setData] = useState<Student[]>([])
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
      const sortBy = sorting[0]?.id || "student_id"
      const orderBy = sorting[0]?.desc ? "desc" : "asc"

      const result: fetchStudentReponse = await fetchStudents({
        offset,
        limit: pageSize,
        sortBy,
        orderBy,
        search,
      })

      setData(result.students.rows || [])
      setTotal(result.students.total)
      setSearch(search)
    } catch (error) {
      console.error("Failed to load students:", error)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (newPage: number) => {
    setPageIndex(newPage) // 👈 let useEffect trigger the load
  }

  if (loading) return <div>Loading students...</div>

  return (
    <StudentProvider>
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
            Component: AddStudentDialog,
            props: {
                  label: "Add College",
                  onSuccess: () => loadData(pageIndex * pageSize),
                }
              },
        ]}
      />
    </StudentProvider>
  )
}
