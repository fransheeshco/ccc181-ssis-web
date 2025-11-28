import os
import click
from app.db.connection import db

@click.command("init-db")
def init_db():
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    root_dir = os.path.abspath(os.path.join(base_dir, ".."))
    schema_path = os.path.join(root_dir, "migrations", "schema.sql")
    seed_path = os.path.join(root_dir, "migrations", "seed.sql")

    with db.get_connection() as conn:
        with conn.cursor() as cur:
            # Run schema setup
            with open(schema_path) as f:
                cur.execute(f.read())
            conn.commit()  # make sure old tables are gone

        with conn.cursor() as cur:
            # Now safely run seeding
            with open(seed_path) as f:
                cur.execute(f.read())
            conn.commit()

    click.echo("✅ Database initialized and seeded successfully.")
