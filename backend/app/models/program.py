from app.db import db

def get_all_programs_model():
    with db.get_cursor() as cur:
        cur.execute(
            "SELECT * FROM programs;"
        )
        return cur.fetchall()
    
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
