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

export async function updateProgram(data: updateProgramPayload) {
  const { program_code, program_name, college_code, curr_code } = data

  try {
    const res = await axiosInstance.put<updateProgramPayload>(`/programs/update/${curr_code}`, {
      program_code, program_name, college_code
    })
  } catch (err: any) {
    console.error("API request failed:", err.response?.data || err.message);
    throw new Error(err.response?.data?.msg || "API request failed");
  }
}

export async function deleteProgram(
  data: deleteProgramPayload
): Promise<{ message?: string; error?: string }> {
  const { program_code } = data;

  try {
    const res = await axiosInstance.delete<{ message?: string; error?: string }>(
      `/programs/delete/${program_code}`
    );

    return {
      message: res.data?.message || "✅ Program deleted successfully",
      error: res.data?.error,
    };
  } catch (err: any) {
    console.error("API request failed:", err.response?.data || err.message);

    // Return a consistent structure instead of throwing
    return {
      error: err.response?.data?.error || "❌ Failed to delete program",
    };
  }
}

export async function getAllPrograms(): Promise<Program[]> {
  try {
    const res = await axiosInstance.get("/programs/getprograms");
    console.log("📡 Raw API response from /programs/getprograms:", res.data);
    // unwrap the tuple [data, status]
    const data = Array.isArray(res.data) ? res.data[0] : res.data;
    return data.programs;
  } catch (err: any) {
    console.error("Failed to fetch all programs:", err.response?.data || err.message);
    throw new Error(err.response?.data?.msg || "Failed to fetch programs");
  }
}
