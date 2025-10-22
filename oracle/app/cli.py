import os
import click
from app.db.connection import db

@click.command("init-db")
def init_db():
    # Base directory where this file (init_db.py) resides
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

    # migrations folder is now inside the same folder as the Flask app
    migrations_dir = os.path.join(base_dir, "migrations")
    schema_path = os.path.join(migrations_dir, "schema.sql")
    seed_path = os.path.join(migrations_dir, "seed.sql")

    with db.get_connection() as conn:
        with conn.cursor() as cur:
            # Run schema setup
            with open(schema_path, "r") as f:
                cur.execute(f.read())
            conn.commit()

        with conn.cursor() as cur:
            # Run seeding
            with open(seed_path, "r") as f:
                cur.execute(f.read())
            conn.commit()

    click.echo("✅ Database initialized and seeded successfully.")
