from flask_cors import CORS
from flask import jsonify, request, Blueprint
from app.controllers.program import (create_program_controller, delete_program_controller, update_program_controller, fetch_programs_controller)

program_bp = Blueprint('programs', __name__, url_prefix='/programs')

@program_bp.route('/', methods=['GET'])
def fetch_programs():
    return jsonify(fetch_programs_controller())

@program_bp.route('/create', methods=['POST'])
def create_program():
    data = request.get_json()

    program_code = data.get("program_code")
    program_name = data.get("program_name")
    college_code = data.get("college_code")
    return jsonify(create_program_controller(program_code, program_name, college_code))

@program_bp.route('/update/<string:program_code>', methods=['PUT'])
def patch_program(program_code):
    data = request.get_json()

    new_program_code = data.get("program_code")
    new_program_name = data.get("program_name")
    new_college_code = data.get("college_code")

    return jsonify(update_program_controller(program_code, new_program_code, new_program_name, new_college_code))

@program_bp.route('/delete/<string:program_code>', methods=['DELETE'])
def delete_program(program_code):
    deleted = delete_program_controller(program_code)
    if deleted: 
        return jsonify({"message": "Program deleted", "deleted": dict(deleted)})
    return jsonify({"error": "Program not found"}), 404