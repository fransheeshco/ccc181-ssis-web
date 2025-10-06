import { Program, ProgramsData, programFilters, updateProgramPayload, deleteProgramPayload, fetchProgramReponse } from "@/lib/types/programTypes"
import axiosInstance from "./axios";

async function handleReponse(res: Response) {
    if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.message || "API request failed")
    }
    return res.json()   
}

export async function fetchProgram(filters: programFilters = {}) {
  const params: Record<string, string> = {};

  if (filters.search) params.search = filters.search;
  if (filters.sortBy) params.sort_by = filters.sortBy;
  if (filters.orderBy) params.order = filters.orderBy;
  if (filters.offset !== undefined) params.offset = filters.offset.toString();
  if (filters.limit !== undefined) params.limit = filters.limit.toString();

  try {
    const res = await axiosInstance.get<fetchProgramReponse>("/programs/", { params });

    console.log(res)
    return res.data;
  } catch (err: any) {
    console.error("API request failed:", err.response?.data || err.message);
    throw new Error(err.response?.data?.msg || "API request failed");
  }
}

export async function createProgram(data: Program) {
  const { program_code, program_name, college_code } = data;

  try {
    const res = await axiosInstance.post<Program>("/programs/create", {
        program_code,
        program_name,
        college_code,
    });

    return res.data; // new college returned from API
  } catch (err: any) {
    console.error("API request failed:", err.response?.data || err.message);
    throw new Error(err.response?.data?.msg || "API request failed");
  }
}

export async function updateCollege(data: updateProgramPayload) {
  const { program_code, program_name, college_code, curr_code } = data

  try {
    const res = await axiosInstance.put<updateProgramPayload>(`/programs/update/${curr_code}`, {
      program_code, program_name, college_code, curr_code
    })
  } catch (err: any) {
    console.error("API request failed:", err.response?.data || err.message);
    throw new Error(err.response?.data?.msg || "API request failed");
  }
}

export async function deleteCollege(data: deleteProgramPayload) {
  const { program_code } = data
  try {
    const res = await axiosInstance.delete<deleteProgramPayload>(`/programs/delete/${program_code}`)
  } catch (err: any) {
    console.error("API request failed:", err.response?.data || err.message);
    throw new Error(err.response?.data?.msg || "API request failed");
  }
}