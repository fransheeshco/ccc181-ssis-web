// collegeContext.tsx
"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { fetchStudents as apiFetchStudents } from "@/lib/StudentApi"
import { Student } from "@/lib/types/studentType"

export type StudentsContextType = {
  students: Student[]
  fetchStudents: () => Promise<void>
}

const StudentsContext = createContext<StudentsContextType | undefined>(undefined)

export function StudentProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>([])

  const fetchStudents = async () => {
    const data = await apiFetchStudents()
  }

  return (
    <StudentsContext.Provider value={{ students, fetchStudents }}>
      {children}
    </StudentsContext.Provider>
  )
}

export function useCollegeContext() {
  const ctx = useContext(StudentsContext)
  if (!ctx) throw new Error("useStudentContext must be inside provider")
  return ctx
}
