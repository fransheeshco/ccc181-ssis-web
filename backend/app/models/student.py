from app.db import db

def get_all_students_model():
    with db.get_cursor() as cur:
        cur.execute(
            "SELECT * FROM students;"
        )
        return cur.fetchall()
    
def create_student_model(student_id, first_name, last_name, year_level, gender, program_code):
    with db.get_cursor(commit=True) as cur:
        cur.execute(
            """INSERT INTO students (student_id, first_name, last_name, year_level, gender, program_code) 
            VALUES (%s, %s, %s, %s, %s, %s )""",
            (student_id, first_name, last_name, year_level, gender, program_code)
        )
        return cur.fetchone()

def update_student_model(current_student_id, new_student_id, new_first_name, new_last_name, new_year_level, new_gender, new_program_code):
    with db.get_cursor(commit=True) as cur:
        cur.execute(
            """UPDATE students 
               SET student_id   = COALESCE(%s, student_id),
                   first_name   = COALESCE(%s, first_name),
                   last_name    = COALESCE(%s, last_name),
                   year_level   = COALESCE(%s, year_level),
                   gender       = COALESCE(%s, gender),
                   program_code = COALESCE(%s, program_code)
             WHERE student_id = %s
             RETURNING *;""",
            (new_student_id, new_first_name, new_last_name, new_year_level, new_gender, new_program_code, current_student_id)
        )
        return cur.fetchone()

def delete_student_model(student_id):
    with db.get_cursor(commit=True) as cur:
        cur.execute(
            "DELETE FROM students WHERE student_id = %s", 
            (student_id)
        )
        return cur.fetchone()