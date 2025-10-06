export type College = {
    college_code: string;
    college_name: string;
};

export type CollegesData = {
    rows: College[];
    total: number;
};

export type fetchCollegeReponse = {
    colleges: CollegesData;
    rows: number;
    total: number;
};

export type updateCollegePayload = {
    college_code: string,
    college_name: string,
    curr_code: string
}

export type deleteCollegePayload = {
    college_code: string
}

export type collegeFilters = {
    filterBy?: string,
    search?: string,
    sortBy?: string,
    orderBy?: string,
    offset?: number,
    limit?: number,
}
