from app.db import db

def add_programs_model(program_code, program_name, college_code):
    with db.get_cursor(commit=True) as cur:
        # Check duplicate program_code
        cur.execute("SELECT 1 FROM programs WHERE program_code = %s;", (program_code,))
        if cur.fetchone():
            return {"error": "Program Code already exists"}

        # Check duplicate program_name
        cur.execute("SELECT 1 FROM programs WHERE program_name = %s;", (program_name,))
        if cur.fetchone():
            return {"error": "Program Name already exists"}

        # Insert new record
        cur.execute(
            """
            INSERT INTO programs (program_code, program_name, college_code)
            VALUES (%s, %s, %s);
            """,
            (program_code, program_name, college_code)
        )

        return {
            "program_code": program_code,
            "program_name": program_name,
            "college_code": college_code
        }


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
            search_param = f"%{search}%"
            params.extend([search_param, search_param, search_param])

        cur.execute(query, params)
        total_count = cur.fetchone()[0]
        return total_count


def update_programs_model(current_program_code, new_program_code=None, new_program_name=None, new_college_code=None):
    with db.get_cursor(commit=True) as cur:
        # Check if current program exists
        cur.execute("SELECT 1 FROM programs WHERE program_code = %s;", (current_program_code,))
        if not cur.fetchone():
            return {"error": "Program not found"}

        # Check for duplicate program_code
        cur.execute(
            "SELECT 1 FROM programs WHERE program_code = %s AND program_code != %s;",
            (new_program_code, current_program_code)
        )
        if new_program_code and cur.fetchone():
            return {"error": "Program Code already exists"}

        # Check for duplicate program_name
        cur.execute(
            "SELECT 1 FROM programs WHERE program_name = %s AND program_code != %s;",
            (new_program_name, current_program_code)
        )
        if new_program_name and cur.fetchone():
            return {"error": "Program Name already exists"}

        # Perform the update
        cur.execute("""
            UPDATE programs
            SET program_code = COALESCE(%s, program_code),
                program_name = COALESCE(%s, program_name),
                college_code = COALESCE(%s, college_code)
            WHERE program_code = %s;
        """, (new_program_code, new_program_name, new_college_code, current_program_code))

        return {
            "program_code": new_program_code or current_program_code,
            "program_name": new_program_name,
            "college_code": new_college_code
        }


def delete_programs_model(program_code):
    with db.get_cursor(commit=True) as cur:
        cur.execute(
            "DELETE FROM programs WHERE program_code = %s RETURNING *;", 
            (program_code,)
        )
        deleted_row = cur.fetchone()
        return deleted_row


def get_all_programs_wo_filters_model():
    with db.get_cursor(commit=False) as cur:
        cur.execute("SELECT program_code, program_name FROM programs ORDER BY program_code;")
        columns = [desc[0] for desc in cur.description]
        programs = cur.fetchall()

        return [
            dict(zip(columns, row))
            for row in programs
        ]
