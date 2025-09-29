"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react"

export type College = {
    college_code: string
    college_name: string
}

type UpdateCollegePayload = {
    college_code: string
    college_name: string
    curr_code: string
}

type CollegeFilters = {
    limit?: number
    offset?: number
    search?: string
    sort_by?: string
    order?: "ASC" | "DESC"
}

type CollegeContextType = {
    colleges: College[]
    setColleges: (colleges: College[]) => void
    fetchColleges: (filters?: CollegeFilters) => Promise<void>
    addCollege: (college: Omit<College, "college_code">) => Promise<void>
    updateCollege: (payload: UpdateCollegePayload) => Promise<void>
    deleteCollege: (college_code: string) => Promise<void>
}

const CollegeContext = createContext<CollegeContextType | null>(null)

export function useCollegeContext() {
    const ctx = useContext(CollegeContext)
    if (!ctx) throw new Error("useCollegeContext must be inside provider")
    return ctx
}

export function CollegeProvider({
    children,
    initialData,
}: {
    children: ReactNode
    initialData: College[]
}) {
    const [colleges, setColleges] = useState<College[]>(initialData)

    // 🔹 Fetch with filters
    const fetchColleges = async ({
        limit = 10,
        offset = 0,
        search = "",
        sort_by = "college_code",
        order = "ASC",
    }: CollegeFilters = {}) => {
        const query = new URLSearchParams({
            limit: String(limit),
            offset: String(offset),
            search,
            sort_by,
            order,
        })

        const res = await fetch(`http://localhost:8000/api/colleges?${query.toString()}`, {
        credentials: "include",
        })

        const data = await res.json()
        setColleges(data)
    }

    // 🔹 Add
    const addCollege = async (college: Omit<College, "college_code">) => {
        const res = await fetch("http://localhost:8000/api/colleges/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(college),
            credentials: "include",
        })

        if (!res.ok) throw new Error("Failed to add college")
        const newCollege = await res.json()

        setColleges((prev) => [...prev, newCollege])
    }

    // 🔹 Update
    const updateCollege = async (payload: UpdateCollegePayload) => {
        const res = await fetch(
            `http://localhost:8000/api/colleges/update/${payload.curr_code}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    college_code: payload.college_code,
                    college_name: payload.college_name,
                }),
                credentials: "include",
            }
        )

        if (!res.ok) throw new Error("Failed to update college")

        const updated = await res.json()

        setColleges((prev) =>
            prev.map((c) =>
                c.college_code === payload.curr_code ? updated : c
            )
        )

        return updated
    }

    // 🔹 Delete
    const deleteCollege = async (college_code: string) => {
        const res = await fetch(`http://localhost:8000/api/colleges/delete/${college_code}`, {
            method: "DELETE",
            credentials: "include",
        })

        if (!res.ok) throw new Error("Failed to delete college")

        setColleges((prev) => prev.filter((c) => c.college_code !== college_code))
    }

    // Fetch initial data on mount
    useEffect(() => {
        fetchColleges()
    }, [])

    return (
        <CollegeContext.Provider
            value={{ colleges, setColleges, fetchColleges, addCollege, updateCollege, deleteCollege }}
        >
            {children}
        </CollegeContext.Provider>
    )
}
