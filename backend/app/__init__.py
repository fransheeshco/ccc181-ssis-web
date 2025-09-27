from flask import Flask
from flask_cors import CORS
from app.routes import collegeRoutes, studentRoutes, programRoutes, userRoutes
from app.cli import init_db
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from flask_bcrypt import Bcrypt

import os

def create_app():
    app = Flask(__name__)
    
    CORS(
        app,
        origins=[
            "http://127.0.0.1:3000",
            "http://localhost:3000"
        ],
        supports_credentials=True,
        methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    )


    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
    app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
    app.config['JWT_COOKIE_CSRF_PROTECT'] = False
    app.config['JWT_ACCESS_COOKIE_PATH'] = '/api/'
    app.config["JWT_COOKIE_DOMAIN"] = "localhost"
    app.config['JWT_REFRESH_COOKIE_PATH'] = '/api/'
    app.config["JWT_COOKIE_SAMESITE"] = "None"
    app.config["JWT_COOKIE_SECURE"] = False   # browsers require HTTPS if SameSite=None
    app.config["JWT_COOKIE_SAMESITE"] = "Lax"


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
