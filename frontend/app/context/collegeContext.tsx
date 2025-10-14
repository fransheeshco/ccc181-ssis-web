// collegeContext.tsx
"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { fetchColleges as apiFetchColleges } from "@/lib/CollegeApi"
import { College } from "@/lib/types/collegeTypes"

export type CollegeContextType = {
  colleges: College[]
  fetchColleges: () => Promise<void>
}

const CollegeContext = createContext<CollegeContextType | undefined>(undefined)

export function CollegeProvider({ children }: { children: ReactNode }) {
  const [colleges, setColleges] = useState<College[]>([])

  const fetchColleges = async () => {
    const data = await apiFetchColleges()
  }

  return (
    <CollegeContext.Provider value={{ colleges, fetchColleges }}>
      {children}
    </CollegeContext.Provider>
  )
}

export function useCollegeContext() {
  const ctx = useContext(CollegeContext)
  if (!ctx) throw new Error("useCollegeContext must be inside provider")
  return ctx
}
