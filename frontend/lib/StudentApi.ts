import { studentFilters, Student, StudentsData, fetchStudentReponse, updateStudentPayload, deleteStudentPayload } from "@/lib/types/studentType"
import axiosInstance from "./axios";

export async function fetchStudents(filters: studentFilters = {}): Promise<fetchStudentReponse> {
  const params: Record<string, string> = {};

  if (filters.search) params.search = filters.search;
  if (filters.sortBy) params.sort_by = filters.sortBy;
  if (filters.orderBy) params.order = filters.orderBy;
  if (filters.offset !== undefined) params.offset = filters.offset.toString();
  if (filters.limit !== undefined) params.limit = filters.limit.toString();

  try {
    const res = await axiosInstance.get<fetchStudentReponse>("/students/", { params });
    return res.data;
  } catch (err: any) {
    console.error("API request failed:", err.response?.data || err.message);
    throw new Error(err.response?.data?.message || "❌ Failed to fetch students");
  }
}

export async function createStudent(data: Student, photoFile?: File) {
  const { student_id, first_name, last_name, program_code, year_level, gender } = data;

  try {
    const formData = new FormData();
    formData.append("student_id", student_id);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("program_code", program_code);
    formData.append("year_level", year_level.toString());
    formData.append("gender", gender);

    // 2️⃣ Append photo if available
    if (photoFile) {
      formData.append("photo", photoFile);
    }

    const res = await axiosInstance.post<{ message?: string }>("/students/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return { message: res.data?.message || "✅ Student created successfully" };
  } catch (err: any) {
    const backendMessage =
      err.response?.data?.message ||  
      err.response?.data?.error ||    
      err.message || 
      "API request failed";

    console.error("API request failed:", backendMessage);
    throw new Error(
      err.response?.data?.error ||
      err.response?.data?.message ||
      "API request failed"
    );
  }
}

export async function updateStudent(
  data: updateStudentPayload
): Promise<{ message?: string; error?: string }> {
  const { student_id, first_name, last_name, program_code, year_level, gender, curr_code } = data;

  try {
    const res = await axiosInstance.put<{ message?: string }>(`/students/update/${curr_code}`, {
      student_id,
      first_name,
      last_name,
      program_code,
      year_level,
      gender,
    });

    return { message: res.data?.message || "✅ Student updated successfully" };
  } catch (err: any) {
    const backendMessage =
      err.response?.data?.message ||  // Flask returns { message: "..." }
      err.response?.data?.error ||    // sometimes { error: "..." }
      err.message || 
      "API request failed";

    console.error("API request failed:", backendMessage);
    throw new Error(
      err.response?.data?.error ||
      err.response?.data?.message ||
      "API request failed"
    );
  }
}

export async function deleteStudent(
  data: deleteStudentPayload
): Promise<{ message?: string; error?: string }> {
  const { student_id } = data;

  try {
    const res = await axiosInstance.delete<{ message?: string; error?: string }>(
      `/students/delete/${student_id}`
    );

    // ✅ Only return keys that actually exist
    if (res.data?.error) {
      return { error: res.data.error };
    }
    return {
      message: res.data?.message || "✅ Student deleted successfully",
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

