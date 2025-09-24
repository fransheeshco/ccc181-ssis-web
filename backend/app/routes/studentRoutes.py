from flask_cors import CORS
from flask import jsonify, request, Blueprint
from app.controllers.student import (
    create_student_controller, fetch_students_controller,
    update_student_controller, delete_student_controller
)

student_bp = Blueprint('students', __name__, url_prefix='/students')

@student_bp.route('/', methods=['GET'])
def fetch_students():
    return jsonify(fetch_students_controller())

@student_bp.route('/create', methods=['POST'])
def create_student():
    data = request.get_json()

    student_id = data.get("student_id")
    first_name = data.get("first_name")
    last_name = data.get("last_name")
    year_level = data.get("year_level")
    gender = data.get("gender")
    program_code = data.get("program_code")
    
    return jsonify(create_student_controller(student_id, first_name, last_name, year_level, gender, program_code))

@student_bp.route('/update/<string:student_id>', methods=['PUT'])
def update_student(student_id):
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
def delete_student(student_id):
    return jsonify(delete_student_controller(student_id))
