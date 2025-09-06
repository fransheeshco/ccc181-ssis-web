from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)

    @app.route("/api/hello", methods=["GET"])
    def hello():
        return {"message": "Hello from Flask!"}

    return app
