from app.db import db

def add_college_model(college_code, college_name):
    with db.get_cursor(commit=True) as cur:
        cur.execute(
            "SELECT 1 FROM college WHERE college_code = %s;", (college_code,)
        )

        if cur.fetchone():
            return None

        cur.execute(
           """
           INSERT INTO college (college_code, college_name) VALUES (%s, %s);
           """,
            (college_code, college_name)
        )
        return {
            "college_code": college_code,
            "college_name": college_name
        }

def get_colleges_model(limit=10, offset=0, search=None, sort_by="college_code", order="ASC"):
    with db.get_cursor() as cur:
        # ✅ Whitelist columns and sort orders
        valid_sort_columns = ["college_code", "college_name"]
        valid_orders = ["ASC", "DESC"]

        if sort_by not in valid_sort_columns:
            sort_by = "college_code"
        if order.upper() not in valid_orders:
            order = "ASC"

        basequery = "SELECT * FROM college"
        params = []

        if search:
            basequery += " WHERE college_code ILIKE %s OR college_name ILIKE %s"
            search_param = f"%{search}%"
            params.extend([search_param, search_param])

        # Safe interpolation of whitelisted values
        basequery += f" ORDER BY {sort_by} {order} LIMIT %s OFFSET %s"
        params.extend([limit, offset])

        cur.execute(basequery, tuple(params))

        colnames = [desc[0] for desc in cur.description]

        # Map each row to dict
        results = [dict(zip(colnames, row)) for row in cur.fetchall()]

        return results
    
def get_total_colleges_model(search=None):
    with db.get_cursor(commit=False) as cur:
        query = "SELECT COUNT(*) FROM college"
        params = []

        if search:
            query += " WHERE college_code ILIKE %s OR college_name ILIKE %s"
            params.extend([f"%{search}%", f"%{search}%"])

        cur.execute(query, params)
        total_count = cur.fetchone()[0]
        return total_count

def update_college_model(new_college_code=None, new_college_name=None, curr_code=None):
    with db.get_cursor(commit=True) as cur:
        cur.execute(
            """
            UPDATE college
            SET college_code = COALESCE(%s, college_code),
                college_name = COALESCE(%s, college_name)
            WHERE college_code = %s
            RETURNING college_code, college_name
            """,
            (new_college_code, new_college_name, curr_code)
        )
        updated = cur.fetchone()
        if not updated:
            return None
        return updated

    
def delete_college_model(college_code):
    with db.get_cursor(commit=True) as cur:
        cur.execute(
            "DELETE FROM college WHERE college_code = %s RETURNING *;", (college_code,)
        )
        return cur.rowcount
