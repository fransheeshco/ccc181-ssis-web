from app.db import db
from app.lib.supabaseclient import delete_student_photo

STUDENT_COLUMNS = ["student_id", "first_name", "last_name", "year_level", "gender", "program_code"]

def create_student_model(student_id, first_name, last_name, year_level, gender, program_code):
    with db.get_cursor(commit=True) as cur:
        year_level_str = str(year_level)

        # Check duplicate student_id
        cur.execute("SELECT 1 FROM students WHERE student_id = %s;", (student_id,))
        if cur.fetchone():
            return {"error": "Student ID already exists"}

        cur.execute(
            """
            INSERT INTO students (student_id, first_name, last_name, year_level, gender, program_code)
            VALUES (%s, %s, %s, %s, %s, %s);
            """,
            (student_id, first_name, last_name, year_level_str, gender, program_code)
        )

        return {
            "student_id": student_id,
            "first_name": first_name,
            "last_name": last_name,
            "year_level": year_level_str,
            "gender": gender,
            "program_code": program_code
        }


def get_all_students_model(limit=10, offset=0, search=None, sort_by="student_id", order="ASC"):
    with db.get_cursor() as cur:
        valid_sort_columns = STUDENT_COLUMNS
        valid_orders = ["ASC", "DESC"]

        if sort_by not in valid_sort_columns:
            sort_by = "student_id"
        if order.upper() not in valid_orders:
            order = "ASC"

        basequery = "SELECT * FROM students"
        params = []

        if search:
            search_param = f"%{search}%"

            # Column-specific search
            col_conditions = " OR ".join([f"{col}::text ILIKE %s" for col in STUDENT_COLUMNS])

            # Full name search (first_name + last_name)
            full_name_condition = "(first_name || ' ' || last_name) ILIKE %s"

            basequery += f" WHERE ({col_conditions} OR {full_name_condition})"
            params.extend([search_param] * len(STUDENT_COLUMNS))
            params.append(search_param)  # for full name search

        basequery += f" ORDER BY {sort_by} {order} LIMIT %s OFFSET %s"
        params.extend([limit, offset])

        cur.execute(basequery, tuple(params))
        colnames = [desc[0] for desc in cur.description]
        return [dict(zip(colnames, row)) for row in cur.fetchall()]


def get_total_students_model(search=None):
    with db.get_cursor(commit=False) as cur:
        query = "SELECT COUNT(*) FROM students"
        params = []

        if search:
            search_param = f"%{search}%"
            col_conditions = " OR ".join([f"{col}::text ILIKE %s" for col in STUDENT_COLUMNS])
            full_name_condition = "(first_name || ' ' || last_name) ILIKE %s"
            query += f" WHERE ({col_conditions} OR {full_name_condition})"
            params.extend([search_param] * len(STUDENT_COLUMNS))
            params.append(search_param)

        cur.execute(query, tuple(params))
        return cur.fetchone()[0]


def update_student_model(current_student_id, new_student_id, new_first_name, new_last_name, new_year_level, new_gender, new_program_code):
    with db.get_cursor(commit=True) as cur:
        new_year_level_str = str(new_year_level)

        # Check if student exists
        cur.execute("SELECT 1 FROM students WHERE student_id = %s;", (current_student_id,))
        if not cur.fetchone():
            return {"error": "Student not found"}

        # Check if new ID is already used
        if new_student_id != current_student_id:
            cur.execute("SELECT 1 FROM students WHERE student_id = %s;", (new_student_id,))
            if cur.fetchone():
                return {"error": "New Student ID already exists"}

        # Validate program_code exists
        cur.execute("SELECT 1 FROM programs WHERE program_code = %s;", (new_program_code,))
        if not cur.fetchone():
            return {"error": "Invalid program code"}

        # Perform update
        cur.execute("""
            UPDATE students
            SET student_id = COALESCE(%s, student_id),
                first_name = COALESCE(%s, first_name),
                last_name = COALESCE(%s, last_name),
                year_level = COALESCE(%s, year_level),
                gender = COALESCE(%s, gender),
                program_code = COALESCE(%s, program_code)
            WHERE student_id = %s;
        """, (
            new_student_id, new_first_name, new_last_name,
            new_year_level_str, new_gender, new_program_code,
            current_student_id
        ))

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
        cur.execute("DELETE FROM students WHERE student_id = %s RETURNING *;", (student_id,))
        deleted_row = cur.fetchone()
        if not deleted_row:
            return {"error": "Student not found"}
        return {"message": "✅ Student deleted successfully"}

def update_student_photo_model(student_id, photo_file_name, photo_url):
    """
    Updates BOTH filename and URL in DB.
    """
    with db.get_cursor(commit=True) as cur:
        cur.execute(
            """
            UPDATE students
            SET photo_file_name = %s,
                photo_url = %s
            WHERE student_id = %s;
            """,
            (photo_file_name, photo_url, student_id)
        )

def remove_student_photo_model(student_id):
    """
    Deletes student's photo from Supabase and clears DB fields.
    """
    with db.get_cursor(commit=True) as cur:
        cur.execute(
            "SELECT photo_file_name FROM students WHERE student_id = %s;",
            (student_id,)
        )
        result = cur.fetchone()

        if not result or not result[0]:
            return {"message": "No photo to remove"}

        file_name = result[0]  # already the filename only

    # Delete from Supabase
    deleted = delete_student_photo(file_name)
    if not deleted:
        return {"error": "Failed to delete photo from storage"}

    # Clear DB
    with db.get_cursor(commit=True) as cur:
        cur.execute(
            """
            UPDATE students
            SET photo_file_name = NULL,
                photo_url = NULL
            WHERE student_id = %s;
            """,
            (student_id,)
        )

    return {"message": "Photo removed successfully"}
