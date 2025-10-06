// lib/collegeApi.ts
import { College, CollegeFilters, CollegeAPIResponse } from "@/app/context/collegeContext";
import { cookies } from "next/headers";

export async function getColleges(filters: CollegeFilters = {}): Promise<{rows: College[], total: number}> {
    const query = new URLSearchParams({
        limit: String(filters.limit ?? 10),
        offset: String(filters.offset ?? 0),
        search: filters.search ?? "",
        sort_by: filters.sort_by ?? "college_code",
        order: filters.order ?? "ASC",
    });

    const cookieStore = await cookies()
    const cookieHeader = await cookieStore.toString()

    const res = await fetch(`http://localhost:8000/api/colleges?${query.toString()}`, {
        credentials: "include",
        headers: { 
            "Content-Type": "application/json" ,
            Cookie: cookieHeader
        },
    });

    if (!res.ok) throw new Error("Failed to fetch colleges");

    const data = await res.json();
    return {
        rows: data.rows,
        total: data.total
    }
}
