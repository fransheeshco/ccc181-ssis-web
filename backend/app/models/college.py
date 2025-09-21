from app.db import db

def add_college(college_code, college_name):
    with db.get_cursor(commit=True) as cur:
        cur.execute(
           """
           INSERT INTO college (college_code, college_name) VALUES (%s, %s);
           """,
            (college_code, college_name)
        )

def get_colleges():
    with db.get_cursor() as cur:
        cur.execute(
            "SELECT * FROM college;"
        )
        return cur.fetchall()

def update_college(college_code=None, college__name=None):
    with db.get_cursor(commit=True) as cur:
        cur.execute(
            """
            UPDATE college SET college_code = COALESCE(%s, college_code), college_name = COALESCE(%s, college_name), WHERE college_code = college_code
            """,
            (college_code, college_code)
        )
        return cur.rowcount
    
def delete_college(college_code):
    with db.get_cursor as cur:
        cur.execute(
            "DELETE FROM college WHERE collge_code = %s", (college_code)
        )