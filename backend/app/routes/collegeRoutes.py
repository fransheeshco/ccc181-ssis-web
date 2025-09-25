from flask_cors import CORS
from flask import jsonify, Blueprint, request
from app.controllers.college import (fetch_college_controller, update_college_controller, create_college_controller, delete_college_controller) 
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

college_bp = Blueprint('colleges', __name__, url_prefix='/colleges')

@college_bp.route('/', methods=['GET'])
@jwt_required()
def fetch_colleges():
    valid_user = get_jwt_identity()
    if valid_user is None:
        return jsonify({"message": "❌ Unauthorized"}), 401
    return jsonify(fetch_college_controller())

@college_bp.route('/create', methods=['POST'])
@jwt_required()
def create_college():
    valid_user = get_jwt_identity()
    if valid_user is None:
        return jsonify({"message": "❌ Unauthorized"}), 401
    
    data = request.get_json()

    college_code = data.get("college_code")
    college_name = data.get("college_name")
    return jsonify(create_college_controller(college_code, college_name))

@college_bp.route("/update/<string:college_code>", methods=["PUT"])
@jwt_required()
def update_college_route(college_code):
    valid_user = get_jwt_identity()
    if valid_user is None:
        return jsonify({"message": "❌ Unauthorized"}), 401
    
    data = request.get_json()
    new_code = data.get("college_code")     
    new_name = data.get("college_name")
    return jsonify(update_college_controller(college_code, new_code, new_name))

@college_bp.route('/delete/<string:college_code>', methods=['DELETE'])
@jwt_required()
def delete_college(college_code):
    valid_user = get_jwt_identity()
    if valid_user is None:
        return jsonify({"message": "❌ Unauthorized"}), 401
    
    return jsonify(delete_college_controller(college_code))
