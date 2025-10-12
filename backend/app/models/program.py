from app.db import db

def get_all_programs_model(limit=10, offset=0, search=None, sort_by="program_code", order="ASC"):
    with db.get_cursor() as cur:
        valid_sort_columns = ["program_code", "program_name", "college_code"]
        valid_orders = ["ASC", "DESC"]

        if sort_by not in valid_sort_columns:
            sort_by = "program_code"
        if order.upper() not in valid_orders:
            order = "ASC"

        basequery = "SELECT * FROM programs"
        params = []

        if search:
            basequery += " WHERE program_code ILIKE %s OR program_name ILIKE %s OR college_code ILIKE %s"
            search_param = f"%{search}%"
            params.extend([search_param, search_param, search_param])

        basequery += f" ORDER BY {sort_by} {order} LIMIT %s OFFSET %s"
        params.extend([limit, offset])
        cur.execute(basequery, tuple(params))
        colnames = [desc[0] for desc in cur.description]
        results = [dict(zip(colnames, row)) for row in cur.fetchall()]
        return results

def get_total_programs_model(search=None):
    with db.get_cursor(commit=False) as cur:
        query = "SELECT COUNT(*) FROM programs"
        params = []

        if search:
            query += " WHERE program_code ILIKE %s OR program_name ILIKE %s OR college_code ILIKE %s"
            params.extend([f"%{search}%", f"%{search}%", f"%{search}%"])

        cur.execute(query, params)
        total_count = cur.fetchone()[0]
        return total_count
    
def add_programs_model(program_code, program_name, college_code):
    with db.get_cursor(commit=True) as cur:
        cur.execute(
            "SELECT 1 FROM programs WHERE program_code = %s;", (program_code,)
        )

        if cur.fetchone():
            return None 
        
        cur.execute(
            """INSERT INTO programs (program_code, program_name, college_code) VALUES (%s, %s, %s)""",
            (program_code, program_name, college_code)
        )
        return {
            "program_code": program_code,
            "program_name": program_name,
            "college_code": college_code   
        }

def update_programs_model(current_program_code, program_code=None, program_name=None, college_code=None):
    with db.get_cursor(commit=True) as cur:
        cur.execute(
            """UPDATE programs 
            SET program_code = COALESCE(%s, program_code), 
                program_name = COALESCE(%s, program_name), 
                college_code = COALESCE(%s, college_code) 
            WHERE program_code = %s;""",
            (program_code, program_name, college_code, current_program_code)
        )
        return {
            "program_code": program_code,
            "program_name": program_name,
            "college_code": college_code   
        }

def delete_programs_model(program_code):
    with db.get_cursor(commit=True) as cur:
        cur.execute(
            "DELETE FROM programs WHERE program_code = %s RETURNING *;", (program_code,)
        )
        return cur.rowcount

def get_all_programs_wo_filters_model():
    with db.get_cursor(commit=False) as cur:
        cur.execute(
            "SELECT program_code, program_name FROM programs ORDER BY program_code"
        )
        columns = [desc[0] for desc in cur.description]
        programs = cur.fetchall()

        return [
            dict(zip(columns, row))
            for row in programs
        ]