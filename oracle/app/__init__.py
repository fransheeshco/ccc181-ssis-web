from flask import Flask, send_from_directory, request, redirect
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from app.routes import collegeRoutes, studentRoutes, programRoutes, userRoutes
from app.cli import init_db
import os


def create_app():
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    static_folder = os.path.join(BASE_DIR, "static")

    print(f"🚀 Using static folder: {static_folder}")
    print(f"📁 Exists: {os.path.exists(static_folder)}")

    # Initialize Flask with static folder
    app = Flask(
        __name__,
        static_folder=static_folder,
        static_url_path=""
    )

    # -------------------------------------------------
    # CORS
    # -------------------------------------------------
    CORS(
        app,
        origins=["http://localhost:3000", "http://localhost:8000", "http://localhost:5000"],
        supports_credentials=True,
    )

    # -------------------------------------------------
    # JWT CONFIG
    # -------------------------------------------------
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "secret")
    app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
    app.config["JWT_COOKIE_CSRF_PROTECT"] = False
    app.config["JWT_ACCESS_COOKIE_PATH"] = "/"
    app.config["JWT_REFRESH_COOKIE_PATH"] = "/"
    app.config["JWT_SAMESITE"] = "Lax"
    app.config["JWT_COOKIE_SECURE"] = False  # ⚠️ True in production

    jwt = JWTManager(app)
    bcrypt = Bcrypt(app)

    # -------------------------------------------------
    # BLUEPRINTS
    # -------------------------------------------------
    app.register_blueprint(collegeRoutes.college_bp)
    app.register_blueprint(programRoutes.program_bp)
    app.register_blueprint(studentRoutes.student_bp)
    app.register_blueprint(userRoutes.user_bp)

    app.cli.add_command(init_db)

    # -------------------------------------------------
    # DEBUG PATH ROUTE
    # -------------------------------------------------
    @app.route('/debug-path')
    def debug_path():
        requested = request.args.get('p', '')
        static_path = os.path.join(app.static_folder, requested)
        return {
            "requested": requested,
            "static_folder": app.static_folder,
            "exists": os.path.exists(static_path),
            "is_dir": os.path.isdir(static_path),
            "is_file": os.path.isfile(static_path),
            "full_path": static_path
        }

    # -------------------------------------------------
    # Next.js STATIC ASSETS (_next/)
    # -------------------------------------------------
    @app.route('/_next/<path:path>')
    def next_static(path):
        next_path = os.path.join(app.static_folder, "_next")
        return send_from_directory(next_path, path)

    # -------------------------------------------------
    # EXPLICIT REDIRECTS FOR ALL ROUTES
    # -------------------------------------------------
    @app.route('/login')
    def redirect_login():
        return redirect('/login/index.html')

    @app.route('/register')
    def redirect_register():
        return redirect('/register/index.html')

    @app.route('/protected/students')
    def redirect_students():
        return redirect('/protected/students/index.html')
    
    @app.route('/protected/colleges')
    def redirect_colleges():
        return redirect('/protected/colleges/index.html')
    

    @app.route('/protected/programs')
    def redirect_programs():
        return redirect('/protected/programs/index.html')

    # Add more routes as needed
    @app.route('/protected/settings')
    def redirect_settings():
        return redirect('/protected/settings/index.html')

    # -------------------------------------------------
    # SIMPLE CATCH-ALL ROUTE
    # -------------------------------------------------
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve_frontend(path):
        static_root = app.static_folder

        print(f"📥 Request received for path: '{path}'")
        print(f"📨 Headers: {dict(request.headers)}")
        print(f"🔍 Referrer: {request.referrer}")
        
        # Remove trailing slash
        path = path.rstrip('/')
        
        # If it's empty path, serve main index.html
        if path == '':
            return send_from_directory(static_root, 'index.html')
        
        full_path = os.path.join(static_root, path)
        
        # 1. If it's an existing file, serve it
        if os.path.isfile(full_path):
            return send_from_directory(static_root, path)
        
        # 2. If it's a directory with index.html, serve it
        if os.path.isdir(full_path) and os.path.isfile(os.path.join(full_path, 'index.html')):
            return send_from_directory(full_path, 'index.html')
        
        # 3. If .html file exists, serve it
        if os.path.isfile(full_path + '.html'):
            return send_from_directory(static_root, path + '.html')
        
        # 4. Otherwise, serve main index.html (SPA fallback)
        return send_from_directory(static_root, 'index.html')

    # -------------------------------------------------
    # SIMPLE TEST ROUTE
    # -------------------------------------------------
    @app.route("/api/hello")
    def hello():
        return {"message": "Hello from Flask!"}

    return app