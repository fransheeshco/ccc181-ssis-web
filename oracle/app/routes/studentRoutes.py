from flask_cors import CORS
from flask import jsonify, request, Blueprint
from app.controllers.student import (
    create_student_controller, fetch_students_controller,
    update_student_controller, delete_student_controller,
    get_total_students_model
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
    
    limit = request.args.get("limit", default=10, type=int)
    offset = request.args.get("offset", default=0, type=int)
    search = request.args.get("search", default=None, type=str)
    filter_by = request.args.get("sort_by", default="student_id", type=str)
    order = request.args.get("order", default="ASC", type=str)

    print(f"Received params - limit: {limit}, offset: {offset}, search: {search}, sort_by: {filter_by}, order: {order}")
        

    total_count = get_total_students_model(search) 
    students = fetch_students_controller(limit, offset, search, filter_by, order)

    return jsonify({
        "students": students,
        "rows": len(students),
        "total": total_count
    })

@student_bp.route('/create', methods=['POST'])
@jwt_required()
def create_student():
    valid_user = get_jwt_identity()
    if valid_user is None:
        return jsonify({"message": "❌ Unauthorized"}), 401
    
    data = request.get_json()

    response, status = create_student_controller(
        data.get("student_id"),
        data.get("first_name"),
        data.get("last_name"),
        data.get("year_level"),
        data.get("gender"),
        data.get("program_code")
    )
    
    return jsonify(response), status


@student_bp.route('/update/<string:student_id>', methods=['PUT'])
@jwt_required()
def update_student(student_id):
    valid_user = get_jwt_identity()
    if valid_user is None:
        return jsonify({"message": "❌ Unauthorized"}), 401
    
    data = request.get_json()

    response, status = update_student_controller(
        data.get("student_id"), data.get("first_name"), data.get("last_name"),
        data.get("year_level"), data.get("gender"), data.get("program_code"), student_id
    )

    return jsonify(response), status

@student_bp.route('/delete/<string:student_id>', methods=['DELETE'])
@jwt_required()
def delete_student(student_id):
    valid_user = get_jwt_identity()
    if valid_user is None:
        return jsonify({"message": "❌ Unauthorized"}), 401
    
    return jsonify(delete_student_controller(student_id))