from flask import Flask
from flask_cors import CORS
from app.routes import collegeRoutes, studentRoutes, programRoutes
from app.cli import init_db

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.register_blueprint(collegeRoutes.college_bp)
    app.register_blueprint(programRoutes.program_bp)
    app.register_blueprint(studentRoutes.student_bp)

    app.cli.add_command(init_db)

    @app.route("/api/hello", methods=["GET"])
    def hello():
        return {"message": "Hello from Flask!"}

    return app
