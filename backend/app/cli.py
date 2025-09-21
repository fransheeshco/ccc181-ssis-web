import os
import click
from flask import Flask
from app.db.connection import db

@click.command("init-db")
def init_db():
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))  # this is /backend
    root_dir = os.path.abspath(os.path.join(base_dir, ".."))  # go up to project root
    schema_path = os.path.join(root_dir, "migrations", "schema.sql")

    with db.get_connection() as conn, open(schema_path, "r") as f:
        sql = f.read()
        with conn.cursor() as cur:
            cur.execute(sql)
        conn.commit()
    click.echo("✅ Database initialized from schema.sql")
