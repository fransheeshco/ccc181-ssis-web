export type Student = {
    student_id: string,
    first_name: string,
    last_name: string,
    year_level: string,
    gender: string,
    program_code: string
};

export type StudentsData = {
    rows: Student[];
    total: number;
};

export type fetchStudentReponse = {
    colleges: StudentsData;
    rows: number;
    total: number;
};

export type updateStudentPayload = {
    student_id: string,
    first_name: string,
    last_name: string,
    year_level: string,
    gender: string,
    program_code: string,
    curr_code: string
}

export type deleteStudentPayload = {
    student_id: string
}

export type studentFilters = {
    filterBy?: string,
    search?: string,
    sortBy?: string,
    orderBy?: string,
    offset?: number,
    limit?: number,
}
