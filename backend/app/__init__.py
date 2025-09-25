from flask import Flask
from flask_cors import CORS
from app.routes import collegeRoutes, studentRoutes, programRoutes, userRoutes
from app.cli import init_db
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from flask_bcrypt import Bcrypt

import os

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

    jwt = JWTManager(app)
    bcrypt = Bcrypt(app)

    app.register_blueprint(collegeRoutes.college_bp)
    app.register_blueprint(programRoutes.program_bp)
    app.register_blueprint(studentRoutes.student_bp)
    app.register_blueprint(userRoutes.user_bp)

    app.cli.add_command(init_db)

    @app.route("/api/hello", methods=["GET"])
    def hello():
        return {"message": "Hello from Flask!"}

    return app
