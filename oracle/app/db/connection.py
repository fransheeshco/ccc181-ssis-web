import psycopg2
import psycopg2.extras
from contextlib import contextmanager
from app.config import config 

class DatabaseConnection:
    _instance = None

    def __new__(cls):
        if (cls._instance is None):
            cls._instance = super().__new__(cls)
        return cls._instance

    @contextmanager
    def get_connection(self):
        try:
            conn = psycopg2.connect(
                host=config['default'].DB_HOST,
                port=config['default'].DB_PORT,
                database=config['default'].DB_NAME,
                user=config['default'].DB_USER,
                password=config['default'].DB_PASSWORD
            )
            yield conn
        finally:
            conn.close()

    @contextmanager
    def get_cursor(self, commit=False):
        with self.get_connection() as conn: 
            cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
            try:
                yield cursor
                if commit:
                    conn.commit()
            except Exception:
                conn.rollback()
                raise
            finally:
                cursor.close()

db = DatabaseConnection()

