from app.db.connection import db

def test_connection():
    try:
        with db.get_connection() as conn:
            print("✅ Connection successful!")
    except Exception as e:
        print("❌ Connection failed:", e)

if __name__ == "__main__":
    test_connection()