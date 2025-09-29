from app.db import db

def get_all_students_model(limit=10, offset=0, search=None, sort_by="student_id", order="ASC"):
    with db.get_cursor() as cur:
        basequery = "SELECT * FROM students"
        params = []

        if search:
            basequery += " WHERE student_id::text ILIKE %s OR first_name ILIKE %s OR last_name ILIKE %s OR program_code ILIKE %s OR gender ILIKE %s OR year_level::text"
            search_param = f"%{search}%"
            params.extend([search_param, search_param, search_param, search_param])
            params.append(search_param)

        basequery += f" ORDER BY {sort_by} {order} LIMIT %s OFFSET %s"
        params.extend([limit, offset])
        cur.execute(basequery, tuple(params))
        results = cur.fetchall()
        return results

def create_student_model(student_id, first_name, last_name, year_level, gender, program_code):
    with db.get_cursor(commit=True) as cur:
        cur.execute(
            """
            INSERT INTO students (student_id, first_name, last_name, year_level, gender, program_code) 
            VALUES (%s, %s, %s, %s, %s, %s)
            RETURNING student_id, first_name, last_name, year_level, gender, program_code
            """,
            (student_id, first_name, last_name, year_level, gender, program_code)
        )
        return {
            "student_id": student_id,
            "first_name": first_name, 
            "last_name": last_name,
            "year_level": year_level,
            "gender": gender,
            "program_code": program_code
        }

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
        return {
            "student_id": new_student_id,
            "first_name": new_first_name,
            "last_name": new_last_name,
            "year_level": new_year_level,
            "gender": new_gender,
            "program_code": new_program_code
        }

def delete_student_model(student_id):
    with db.get_cursor(commit=True) as cur:
        cur.execute(
            "DELETE FROM students WHERE student_id = %s", 
            (student_id)
        )
        return cur.fetchone()