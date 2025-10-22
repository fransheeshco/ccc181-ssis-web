from flask import Flask, send_from_directory, request, redirect
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from app.routes import collegeRoutes, studentRoutes, programRoutes, userRoutes
from app.cli import init_db
import os

def create_app():
    # Serve static files from built Next.js frontend
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    static_folder = os.path.join(BASE_DIR, "static")
    
    print(f"🚀 Initializing Flask with static folder: {static_folder}")
    print(f"📁 Static folder exists: {os.path.exists(static_folder)}")
    
    if os.path.exists(static_folder):
        index_path = os.path.join(static_folder, "index.html")
        print(f"📄 index.html exists: {os.path.exists(index_path)}")
    
    app = Flask(
        __name__,
        static_folder=static_folder,
        static_url_path=""
    )

    # --- CORS Configuration ---
    CORS(
        app,
        origins=["http://localhost:3000", "http://localhost:8000", "http://localhost:5000"],
        supports_credentials=True,
    )

    # --- JWT Configuration ---
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "secret")
    app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
    app.config["JWT_COOKIE_CSRF_PROTECT"] = False
    app.config["JWT_ACCESS_COOKIE_PATH"] = "/"
    app.config["JWT_REFRESH_COOKIE_PATH"] = "/"
    app.config["JWT_SAMESITE"] = "Lax"
    app.config["JWT_COOKIE_SECURE"] = False  # ⚠️ set True in production

    jwt = JWTManager(app)
    bcrypt = Bcrypt(app)

    # --- Register Blueprints (API routes) ---
    app.register_blueprint(collegeRoutes.college_bp)
    app.register_blueprint(programRoutes.program_bp)
    app.register_blueprint(studentRoutes.student_bp)
    app.register_blueprint(userRoutes.user_bp)

    app.cli.add_command(init_db)

    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def serve_frontend(path):
        """
        Simple static file server for Next.js App Router
        """
        static_path = request.path.lstrip('/')
        
        print(f"🎯 Serving: '{request.path}' -> '{static_path}'")
        
        # Always serve actual files if they exist
        file_path = os.path.join(app.static_folder, static_path)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            print(f"✅ Serving file: {static_path}")
            return send_from_directory(app.static_folder, static_path)
        
        # For routes that end with slash, serve the index.html from that directory
        if static_path.endswith('/') or static_path == '':
            index_file = os.path.join(static_path, "index.html") if static_path else "index.html"
            index_path = os.path.join(app.static_folder, index_file)
            if os.path.exists(index_path):
                print(f"✅ Serving directory index: {index_file}")
                return send_from_directory(app.static_folder, index_file)
        
        # For routes without trailing slash, check if directory exists
        potential_dir = os.path.join(app.static_folder, static_path)
        if os.path.isdir(potential_dir):
            # Redirect to add trailing slash
            return redirect(request.path + '/')
        
        # Final fallback - serve main index.html for client-side routes
        print(f"🔄 Fallback to main index.html for SPA route: '{request.path}'")
        return send_from_directory(app.static_folder, "index.html")
    
    @app.route("/debug-static")
    def debug_static():
        """Debug route to see what files exist in static folder"""
        import os
        static_path = app.static_folder
        
        def list_files(startpath):
            file_structure = []
            for root, dirs, files in os.walk(startpath):
                level = root.replace(startpath, '').count(os.sep)
                indent = ' ' * 2 * level
                file_structure.append(f"{indent}{os.path.basename(root)}/")
                subindent = ' ' * 2 * (level + 1)
                for file in files:
                    file_structure.append(f"{subindent}{file}")
            return file_structure
        
        return {
            "static_folder": static_path,
            "exists": os.path.exists(static_path),
            "contents": list_files(static_path) if os.path.exists(static_path) else []
        }
    # Example test route
    @app.route("/api/hello")
    def hello():
        return {"message": "Hello from Flask!"}

    return app