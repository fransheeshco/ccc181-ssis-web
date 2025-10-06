// collegeContext.tsx
"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { fetchProgram as apiFetchPrograms } from "@/lib/ProgramApi"
import { Program } from "@/lib/types/programTypes"

type ProgramContextType = {
  programs: Program[]
  fetchProgram: () => Promise<void>
}

const ProgramContext = createContext<ProgramContextType | undefined>(undefined)

export function ProgramProvider({ children }: { children: ReactNode }) {
  const [programs, setPrograms] = useState<Program[]>([])

  const fetchProgram = async () => {
    const data = await apiFetchPrograms()
  }

  return (
    <ProgramContext.Provider value={{ programs, fetchProgram }}>
      {children}
    </ProgramContext.Provider>
  )
}

export function useCollegeContext() {
  const ctx = useContext(ProgramContext)
  if (!ctx) throw new Error("useProgramContext must be inside provider")
  return ctx
}
