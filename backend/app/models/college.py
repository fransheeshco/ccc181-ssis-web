from app.db import db

def add_college_model(college_code, college_name):
    with db.get_cursor(commit=True) as cur:
        cur.execute(
           """
           INSERT INTO college (college_code, college_name) VALUES (%s, %s);
           """,
            (college_code, college_name)
        )

def get_colleges_model():
    with db.get_cursor() as cur:
        cur.execute(
            "SELECT * FROM college;"
        )
        return cur.fetchall()

def update_college_model(curr_code, new_college_code=None, new_college_name=None):
    with db.get_cursor(commit=True) as cur:
        cur.execute(
            """
            UPDATE college 
            SET college_code = COALESCE(%s, college_code),
                college_name = COALESCE(%s, college_name)
            WHERE college_code = %s
            """,
            (new_college_code, new_college_name, curr_code)
        )
        return cur.rowcount
    
def delete_college_model(college_code):
    with db.get_cursor(commit=True) as cur:
        cur.execute(
            "DELETE FROM college WHERE college_code = %s RETURNING *;", (college_code,)
        )
        if cur.rowcount > 0:   # at least one row deleted
            return cur.fetchone()
        return None