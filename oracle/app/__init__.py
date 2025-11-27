from flask import Flask, send_from_directory, request, redirect
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from app.routes import collegeRoutes, studentRoutes, programRoutes, userRoutes
from app.cli import init_db
import os

<<<<<<< HEAD
def create_app():
    # Serve static files from built Next.js frontend
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    static_folder = os.path.join(BASE_DIR, "static")
    
    print(f"🚀 Initializing Flask with static folder: {static_folder}")
    print(f"📁 Static folder exists: {os.path.exists(static_folder)}")
    
    if os.path.exists(static_folder):
        index_path = os.path.join(static_folder, "index.html")
        print(f"📄 index.html exists: {os.path.exists(index_path)}")
    
=======

def create_app():
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    static_folder = os.path.join(BASE_DIR, "static")

    print(f"🚀 Using static folder: {static_folder}")
    print(f"📁 Exists: {os.path.exists(static_folder)}")

    # Initialize Flask with static folder
>>>>>>> final/ver2
    app = Flask(
        __name__,
        static_folder=static_folder,
        static_url_path=""
    )

<<<<<<< HEAD
    # --- CORS Configuration ---
=======
    # -------------------------------------------------
    # CORS
    # -------------------------------------------------
>>>>>>> final/ver2
    CORS(
        app,
        origins=["http://localhost:3000", "http://localhost:8000", "http://localhost:5000"],
        supports_credentials=True,
    )

<<<<<<< HEAD
    # --- JWT Configuration ---
=======
    # -------------------------------------------------
    # JWT CONFIG
    # -------------------------------------------------
>>>>>>> final/ver2
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "secret")
    app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
    app.config["JWT_COOKIE_CSRF_PROTECT"] = False
    app.config["JWT_ACCESS_COOKIE_PATH"] = "/"
    app.config["JWT_REFRESH_COOKIE_PATH"] = "/"
    app.config["JWT_SAMESITE"] = "Lax"
<<<<<<< HEAD
    app.config["JWT_COOKIE_SECURE"] = False  # ⚠️ set True in production
=======
    app.config["JWT_COOKIE_SECURE"] = False  # ⚠️ True in production
>>>>>>> final/ver2

    jwt = JWTManager(app)
    bcrypt = Bcrypt(app)

<<<<<<< HEAD
    # --- Register Blueprints (API routes) ---
=======
    # -------------------------------------------------
    # BLUEPRINTS
    # -------------------------------------------------
>>>>>>> final/ver2
    app.register_blueprint(collegeRoutes.college_bp)
    app.register_blueprint(programRoutes.program_bp)
    app.register_blueprint(studentRoutes.student_bp)
    app.register_blueprint(userRoutes.user_bp)

    app.cli.add_command(init_db)

<<<<<<< HEAD
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
=======
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
>>>>>>> final/ver2
    @app.route("/api/hello")
    def hello():
        return {"message": "Hello from Flask!"}

    return app