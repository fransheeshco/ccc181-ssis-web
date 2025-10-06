import { College, fetchCollegeReponse, collegeFilters, updateCollegePayload, deleteCollegePayload } from "@/lib/types/collegeTypes"
import { URLSearchParams } from "url";
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

export async function deleteCollege(data: deleteCollegePayload) {
  const { college_code} = data
  try {
    const res = await axiosInstance.delete<deleteCollegePayload>(`/colleges/delete/${college_code}`)
  } catch (err: any) {
    console.error("API request failed:", err.response?.data || err.message);
    throw new Error(err.response?.data?.msg || "API request failed");
  }
}