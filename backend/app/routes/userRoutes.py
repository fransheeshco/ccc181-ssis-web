from app.controllers.user import (
    register_user_controller, login_user_controller, 
    refresh_token_controller, logout_user_controller
)
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

user_bp = Blueprint('user_bp', __name__, url_prefix='/api/users')

@user_bp.route('/register', methods=['POST'])
def register_user_route():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    
    if not username or not email or not password:
        return jsonify({"message": "❌ Missing required fields"}), 400
    
    return jsonify(register_user_controller(username, email, password))

@user_bp.route('/login', methods=['POST'])
def login_user_route():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({"message": "❌ Missing email or password"}), 400
    
    return login_user_controller(email, password)

@user_bp.route('/token/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh_token_route():
    return refresh_token_controller()

@user_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout_user_route():
    return logout_user_controller()


