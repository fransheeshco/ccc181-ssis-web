export type Program = {
    program_code: string,
    program_name: string,
    college_code: string
};

export type ProgramsData = {
    rows: Program[];
    total: number;
};

export type fetchProgramReponse = {
    colleges: ProgramsData;
    rows: number;
    total: number;
};

export type updateProgramPayload = {
    program_code: string,
    program_name: string,
    college_code: string,
    curr_code: string
}

export type deleteProgramPayload = {
    program_code: string
}

export type programFilters = {
    filterBy?: string,
    search?: string,
    sortBy?: string,
    orderBy?: string,
    offset?: number,
    limit?: number,
}
