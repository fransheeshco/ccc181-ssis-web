from flask_cors import CORS
from flask import jsonify, request, Blueprint
from app.controllers.student import (
    create_student_controller, fetch_students_controller,
    update_student_controller, delete_student_controller,
<<<<<<< HEAD
    get_total_students_model
=======
    get_total_students_model, update_student_photo_model
>>>>>>> final/ver2
)
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

student_bp = Blueprint('students', __name__, url_prefix='/api/students')

@student_bp.route('/', methods=['GET'])
@jwt_required()
def fetch_students():
<<<<<<< HEAD
    valid_user = get_jwt_identity()
    if valid_user is None:
=======
    user = get_jwt_identity()
    if not user:
>>>>>>> final/ver2
        return jsonify({"message": "❌ Unauthorized"}), 401
    
    limit = request.args.get("limit", default=10, type=int)
    offset = request.args.get("offset", default=0, type=int)
    search = request.args.get("search", default=None, type=str)
<<<<<<< HEAD
    filter_by = request.args.get("sort_by", default="student_id", type=str)
    order = request.args.get("order", default="ASC", type=str)

    print(f"Received params - limit: {limit}, offset: {offset}, search: {search}, sort_by: {filter_by}, order: {order}")
        

    total_count = get_total_students_model(search) 
    students = fetch_students_controller(limit, offset, search, filter_by, order)
=======
    sort_by = request.args.get("sort_by", default="student_id", type=str)
    order = request.args.get("order", default="ASC", type=str)

    students = fetch_students_controller(limit, offset, search, sort_by, order)
    total_count = get_total_students_model(search)
>>>>>>> final/ver2

    return jsonify({
        "students": students,
        "rows": len(students),
        "total": total_count
    })

@student_bp.route('/create', methods=['POST'])
@jwt_required()
def create_student():
<<<<<<< HEAD
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
=======
    try:
        valid_user = get_jwt_identity()
        if valid_user is None:
            return jsonify({"message": "❌ Unauthorized"}), 401

        # 1️⃣ Get form fields
        student_id = request.form.get("student_id")
        first_name = request.form.get("first_name")
        last_name = request.form.get("last_name")
        year_level = request.form.get("year_level")
        gender = request.form.get("gender")
        program_code = request.form.get("program_code")
        photo_file = request.files.get("photo")  # optional

        # 2️⃣ Call controller
        student, status = create_student_controller(
            student_id, first_name, last_name, year_level, gender, program_code, photo_file
        )

        return jsonify(student), status

    except Exception as e:
        return jsonify({"message": "Internal Server Error", "error": str(e)}), 500
>>>>>>> final/ver2


@student_bp.route('/update/<string:student_id>', methods=['PUT'])
@jwt_required()
def update_student(student_id):
<<<<<<< HEAD
    valid_user = get_jwt_identity()
    if valid_user is None:
        return jsonify({"message": "❌ Unauthorized"}), 401
    
    data = request.get_json()

    response, status = update_student_controller(
        data.get("student_id"), data.get("first_name"), data.get("last_name"),
        data.get("year_level"), data.get("gender"), data.get("program_code"), student_id
    )

    return jsonify(response), status
=======
    try: 
        valid_user = get_jwt_identity()
        if valid_user is None:
            return jsonify({"message": "❌ Unauthorized"}), 401
        
        current_student_id= request.form.get("current_student_id")
        student_id = request.form.get("new_student_id")
        first_name = request.form.get("first_name")
        last_name = request.form.get("last_name")
        year_level = request.form.get("year_level")
        gender = request.form.get("gender")
        program_code = request.form.get("program_code")
        photo_file = request.files.get("photo")  # optional

        updated_student, status = update_student_controller(
            current_student_id=current_student_id,
            new_student_id=student_id, 
            new_first_name=first_name, 
            new_last_name=last_name, 
            new_year_level=year_level, 
            new_gender=gender, 
            new_program_code=program_code,
            photo_file=photo_file
        )

        return jsonify(updated_student), status
    
    except Exception as e:
        return jsonify({"message": "Internal Server Error", "error": str(e)}), 500
>>>>>>> final/ver2

@student_bp.route('/delete/<string:student_id>', methods=['DELETE'])
@jwt_required()
def delete_student(student_id):
    valid_user = get_jwt_identity()
    if valid_user is None:
        return jsonify({"message": "❌ Unauthorized"}), 401
    
    return jsonify(delete_student_controller(student_id))