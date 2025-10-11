import { studentFilters, Student, StudentsData, fetchStudentReponse, updateStudentPayload, deleteStudentPayload } from "@/lib/types/studentType"
import axiosInstance from "./axios";

export async function fetchStudents(filters: studentFilters = {}) {
    const params: Record<string, string> = {};

    if (filters.search) params.search = filters.search;
    if (filters.sortBy) params.sort_by = filters.sortBy;
    if (filters.orderBy) params.order = filters.orderBy;
    if (filters.offset !== undefined) params.offset = filters.offset.toString();
    if (filters.limit !== undefined) params.limit = filters.limit.toString();

    try {
        const res = await axiosInstance.get<fetchStudentReponse>("/students/", { params });
        console.log(res)
        return res.data;
    } catch (err: any) {
        console.error("API request failed:", err.response?.data || err.message);
        throw new Error(err.response?.data?.msg || "API request failed");
    }
}

export async function createStudent(data: Student) {
    const { student_id,
        first_name,
        last_name,
        program_code,
        year_level,
        gender,
        } = data;

    try {
        const res = await axiosInstance.post<Student>("/students/create", {
            student_id,
            first_name,
            last_name,
            program_code,
            year_level,
            gender,
        });

        return res.data; // new college returned from API
    } catch (err: any) {
        console.error("API request failed:", err.response?.data || err.message);
        throw new Error(err.response?.data?.msg || "API request failed");
    }
}

export async function updateStudent(data: updateStudentPayload) {
    const { student_id,
            first_name,
            last_name,
            program_code,
            year_level,
            gender,
        curr_code } = data

    try {
        const res = await axiosInstance.put<updateStudentPayload>(`/students/update/${curr_code}`, {
            student_id,
            first_name,
            last_name,
            program_code,
            year_level,
            gender,
            curr_code
        })
    } catch (err: any) {
        console.error("API request failed:", err.response?.data || err.message);
        throw new Error(err.response?.data?.msg || "API request failed");
    }
}

export async function deleteStudent(data: deleteStudentPayload) {
    const { student_id } = data
    try {
        const res = await axiosInstance.delete<deleteStudentPayload>(`/students/delete/${student_id}`)
    } catch (err: any) {
        console.error("API request failed:", err.response?.data || err.message);
        throw new Error(err.response?.data?.msg || "API request failed");
    }
}