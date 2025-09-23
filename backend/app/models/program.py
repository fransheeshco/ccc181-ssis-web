from app.db import db
import psycopg2

def get_all_programs_model():
    with db.get_cursor() as cur:
        cur.execute(
            "SELECT * FROM programs;"
        )
        return cur.fetchall()
    
def add_programs_model(program_code, program_name, college_code):
    try: 
        with db.get_cursor(commit=True) as cur:
            cur.execute(
                """INSERT INTO programs (program_code, program_name, college_code) VALUES (%s, %s, %s)""",
                (program_code, program_name, college_code)
            )
            return {"message": "Program created successfully."}, 201
    except psycopg2.IntegrityError as e:
        return {"error": "Invalid college_code. It must exist in the college table."}, 400

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
        return cur.rowcount

def delete_programs_model(program_code):
    with db.get_cursor(commit=True) as cur:
        cur.execute(
            "DELETE FROM programs WHERE program_code = %s RETURNING *;", (program_code,)
        )
        if cur.rowcount > 0:
            return cur.fetchone()
        return None
