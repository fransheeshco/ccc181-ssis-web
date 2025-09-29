from flask_cors import CORS
from flask import jsonify, request, Blueprint
from app.controllers.student import (
    create_student_controller, fetch_students_controller,
    update_student_controller, delete_student_controller
)
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

student_bp = Blueprint('students', __name__, url_prefix='/api/students')

@student_bp.route('/', methods=['GET'])
@jwt_required()
def fetch_students():
    valid_user = get_jwt_identity()
    if valid_user is None:
        return jsonify({"message": "❌ Unauthorized"}), 401
    students = fetch_students_controller()
    formatted = [
    {
        "student_id": student_id,
        "first_name": first_name,
        "last_name": last_name,
        "program": program_code,
        "year_level": year_level,
        "gender": gender
    }
    for student_id, first_name, last_name, year_level, gender, program_code in students
    ]
    return jsonify(formatted)

@student_bp.route('/create', methods=['POST'])
@jwt_required()
def create_student():
    valid_user = get_jwt_identity()
    if valid_user is None:
        return jsonify({"message": "❌ Unauthorized"}), 401
    
    data = request.get_json()

    student_id = data.get("student_id")
    first_name = data.get("first_name")
    last_name = data.get("last_name")
    year_level = data.get("year_level")
    gender = data.get("gender")
    program_code = data.get("program_code")
    
    return jsonify(create_student_controller(student_id, first_name, last_name, year_level, gender, program_code))


@student_bp.route('/update/<string:student_id>', methods=['PUT'])
@jwt_required()
def update_student(student_id):
    valid_user = get_jwt_identity()
    if valid_user is None:
        return jsonify({"message": "❌ Unauthorized"}), 401
    
    data = request.get_json()

    new_student_id = data.get("student_id")
    new_first_name = data.get("first_name")
    new_last_name = data.get("last_name")
    new_year_level = data.get("year_level")
    new_gender = data.get("gender")
    new_program_code = data.get("program_code")

    updated = update_student_controller(
        new_student_id, new_first_name, new_last_name,
        new_year_level, new_gender, new_program_code, student_id
    )

    if updated is None:
        return jsonify({"error": "Student not found"}), 404

    return jsonify(updated)

@student_bp.route('/delete/<string:student_id>', methods=['DELETE'])
@jwt_required()
def delete_student(student_id):
    valid_user = get_jwt_identity()
    if valid_user is None:
        return jsonify({"message": "❌ Unauthorized"}), 401
    
    return jsonify(delete_student_controller(student_id))
