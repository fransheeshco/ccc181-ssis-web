from app.db import db

def add_college_model(college_code, college_name):
    with db.get_cursor(commit=True) as cur:
        # Check for duplicate college code
        cur.execute(
            "SELECT 1 FROM colleges WHERE college_code = %s;", (college_code,)
        )
        if cur.fetchone():
            return {"error": "College Code already exists"}

        # Check for duplicate college name
        cur.execute(
            "SELECT 1 FROM colleges WHERE college_name = %s;", (college_name,)
        )
        if cur.fetchone():
            return {"error": "College Name already exists"}

        # Insert new record
        cur.execute(
            """
            INSERT INTO colleges (college_code, college_name)
            VALUES (%s, %s);
            """,
            (college_code, college_name),
        )

        return {
            "college_code": college_code,
            "college_name": college_name,
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

        basequery = "SELECT * FROM colleges"
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
        query = "SELECT COUNT(*) FROM colleges"
        params = []

        if search:
            query += " WHERE college_code ILIKE %s OR college_name ILIKE %s"
            params.extend([f"%{search}%", f"%{search}%"])

        cur.execute(query, params)
        total_count = cur.fetchone()[0]
        return total_count

def update_college_model(current_code, new_code, new_name):
    with db.get_cursor(commit=True) as cur:
        # 1️⃣ Check if the college we want to update exists
        cur.execute("SELECT 1 FROM colleges WHERE college_code = %s;", (current_code,))
        if not cur.fetchone():
            return {"error": "College not found"}

        # 2️⃣ Check if the new college code is already used by another record
        cur.execute(
            "SELECT 1 FROM colleges WHERE college_code = %s AND college_code != %s;",
            (new_code, current_code)
        )
        if cur.fetchone():
            return {"error": "College Code already exists"}

        # 3️⃣ Check if the new college name is already used by another record
        cur.execute(
            "SELECT 1 FROM colleges WHERE college_name = %s AND college_code != %s;",
            (new_name, current_code)
        )
        if cur.fetchone():
            return {"error": "College Name already exists"}

        # 4️⃣ Proceed with the update
        cur.execute("""
            UPDATE colleges
            SET college_code = %s, college_name = %s
            WHERE college_code = %s;
        """, (new_code, new_name, current_code))

        return {
            "college_code": new_code,
            "college_name": new_name
        }

def delete_college_model(college_code):
    with db.get_cursor(commit=True) as cur:
        # Try deleting and returning row count
        cur.execute(
            "DELETE FROM colleges WHERE college_code = %s RETURNING *;", 
            (college_code,)
        )
        deleted_row = cur.fetchone()
        return deleted_row  # returns None if not found

def get_all_colleges_model():
    with db.get_cursor(commit=False) as cur:
        cur.execute(
            "SELECT college_code, college_name FROM colleges ORDER BY college_code"
        )
        columns = [desc[0] for desc in cur.description]
        colleges = cur.fetchall()
        
        return [
            dict(zip(columns, row))
            for row in colleges
        ]