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
    with db.get_cursor() as cur:
        query = "SELECT COUNT(*) FROM programs"
        params = []

        if search:
            query += " WHERE program_code ILIKE %s OR program_name ILIKE %s OR college_code ILIKE %s"
            search_param = f"%{search}%"
            params.extend([search_param, search_param, search_param])

        cur.execute(query, params)
        return cur.fetchone()[0]


def add_programs_model(program_code, program_name, college_code):
    with db.get_cursor(commit=True) as cur:
        cur.execute("SELECT 1 FROM programs WHERE program_code = %s;", (program_code,))
        if cur.fetchone():
            return None

        cur.execute(
            """INSERT INTO programs (program_code, program_name, college_code)
               VALUES (%s, %s, %s) RETURNING program_code, program_name, college_code;""",
            (program_code, program_name, college_code)
        )
        return cur.fetchone()


def update_programs_model(current_program_code, new_program_code=None, new_program_name=None, new_college_code=None):
    with db.get_cursor(commit=True) as cur:
        # prevent duplicate program codes
        if new_program_code and new_program_code != current_program_code:
            cur.execute("SELECT 1 FROM programs WHERE program_code = %s;", (new_program_code,))
            if cur.fetchone():
                return None  # duplicate program_code

        cur.execute(
            """UPDATE programs
               SET program_code = COALESCE(%s, program_code),
                   program_name = COALESCE(%s, program_name),
                   college_code = COALESCE(%s, college_code)
               WHERE program_code = %s
               RETURNING program_code, program_name, college_code;""",
            (new_program_code, new_program_name, new_college_code, current_program_code)
        )

        return cur.fetchone()


def delete_programs_model(program_code):
    with db.get_cursor(commit=True) as cur:
        cur.execute(
            "DELETE FROM programs WHERE program_code = %s RETURNING *;", (program_code,)
        )
        return cur.fetchone()


def get_all_programs_wo_filters_model():
    with db.get_cursor() as cur:
        cur.execute("SELECT program_code, program_name FROM programs ORDER BY program_code;")
        colnames = [desc[0] for desc in cur.description]
        return [dict(zip(colnames, row)) for row in cur.fetchall()]
