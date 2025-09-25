from app.db import db
from bcrypt import hashpw, gensalt, checkpw

def create_user_model(username, email, password):
    hashed_password = hashpw(password.encode('utf-8'), gensalt()).decode('utf-8')
    with db.get_cursor(commit=True) as cur:
        cur.execute(
            """
            INSERT INTO users (username, email, user_password) 
            VALUES (%s, %s, %s)
            RETURNING user_id, username, email
            """,
            (username, email, hashed_password)
        )
        return {
            "username": username,
            "email": email
        }
    
def login_user_model(email, password):
    with db.get_cursor() as cur:
        cur.execute(
            "SELECT * FROM users WHERE email = %s",
            (email,)
        )
        user = cur.fetchone()
        if user and checkpw(password.encode('utf-8'), user['user_password'].encode('utf-8')):
            return {
                "user_id": user['user_id'],
                "username": user['username'],
                "email": user['email']
            }
        return None