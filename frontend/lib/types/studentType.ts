export type Student = {
    student_id: string,
    first_name: string,
    last_name: string,
    program_code: string,
    year_level: string,
    gender: string,
    photo_url?: string
};

export type StudentsData = {
    rows: Student[];
    total: number;
};

export type fetchStudentReponse = {
    students: StudentsData;
    rows: number;
    total: number;
};

export type updateStudentPayload = {
    student_id: string,
    first_name: string,
    last_name: string,
    program_code: string,
    year_level: string,
    gender: string,
    curr_code: string,
    remove_photo: boolean,
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
