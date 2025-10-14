import { College, fetchCollegeReponse, collegeFilters, updateCollegePayload, deleteCollegePayload } from "@/lib/types/collegeTypes"
import axiosInstance from "./axios";

async function handleReponse(res: Response) {
    if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.message || "API request failed")
    }
    return res.json()   
}

export async function fetchColleges(filters: collegeFilters = {}) {
  const params: Record<string, string> = {};

  if (filters.search) params.search = filters.search;
  if (filters.sortBy) params.sort_by = filters.sortBy;
  if (filters.orderBy) params.order = filters.orderBy;
  if (filters.offset !== undefined) params.offset = filters.offset.toString();
  if (filters.limit !== undefined) params.limit = filters.limit.toString();

  try {
    const res = await axiosInstance.get<fetchCollegeReponse>("/colleges/", { params });

    console.log(res)
    return res.data;
  } catch (err: any) {
    console.error("API request failed:", err.response?.data || err.message);
    throw new Error(err.response?.data?.msg || "API request failed");
  }
}

export async function createCollege(data: College) {
  const { college_code, college_name } = data;

  try {
    const res = await axiosInstance.post<College>("/colleges/create", {
      college_code,
      college_name,
    });
    return res.data; // new college returned from API
  } catch (err: any) {
    console.error("API request failed:", err.response?.data || err.message);
    throw new Error(err.response?.data?.msg || "API request failed");
  }
}

export async function updateCollege(data: updateCollegePayload) {
  const { college_code, college_name, curr_code } = data

  try {
    const res = await axiosInstance.put<updateCollegePayload>(`/colleges/update/${curr_code}`, {
      college_code,
      college_name
    })
  } catch (err: any) {
    console.error("API request failed:", err.response?.data || err.message);
    throw new Error(err.response?.data?.msg || "API request failed");
  }
}

export async function deleteCollege(data: deleteCollegePayload): Promise<{ message?: string; error?: string }> {
  const { college_code } = data;
  try {
    const res = await axiosInstance.delete(`/colleges/delete/${college_code}`);
    return { message: res.data?.message || "✅ College deleted successfully" };
  } catch (err: any) {
    console.error("API request failed:", err.response?.data || err.message);
    return { error: err.response?.data?.error || "❌ Failed to delete college." };
  }
}

export async function getAllColleges(): Promise<College[]> {
  try {
    const res = await axiosInstance.get<College[]>("/colleges/getcolleges");
    return res.data;
  } catch (err: any) {
    console.error("Failed to fetch all colleges:", err.response?.data || err.message);
    throw new Error(err.response?.data?.msg || "Failed to fetch colleges");
  }
}