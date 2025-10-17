from flask_cors import CORS
from flask import jsonify, request, Blueprint
from app.controllers.program import (
    create_program_controller, get_total_programs_model, 
    delete_program_controller, update_program_controller, 
    fetch_programs_controller, get_programs_controller
)
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

program_bp = Blueprint('programs', __name__, url_prefix='/api/programs')

@program_bp.route('/', methods=['GET'])
@jwt_required()
def fetch_programs():
    valid_user = get_jwt_identity()
    if valid_user is None:
        return jsonify({"message": "❌ Unauthorized"}), 401
    
    limit = request.args.get("limit", default=10, type=int)
    offset = request.args.get("offset", default=0, type=int)
    search = request.args.get("search", default=None, type=str)
    filter_by = request.args.get("sort_by", default="program_code", type=str)
    order = request.args.get("order", default="ASC", type=str)

    total_count = get_total_programs_model(search)
    programs = fetch_programs_controller(limit, offset, search, filter_by, order)

    return jsonify({
        "programs": programs,
        "rows": len(programs),
        "total": total_count
    })


@program_bp.route("/create", methods=["POST"])
@jwt_required()
def create_program():
    valid_user = get_jwt_identity()
    if not valid_user:
        return jsonify({"message": "❌ Unauthorized"}), 401

    data = request.get_json()
    response, status = create_program_controller(
        data.get("program_code"),
        data.get("program_name"),
        data.get("college_code")
    )
    return jsonify(response), status

@program_bp.route("/update/<string:program_code>", methods=["PUT"])
@jwt_required()
def update_program(program_code):
    valid_user = get_jwt_identity()
    if not valid_user:
        return jsonify({"message": "❌ Unauthorized"}), 401

    data = request.get_json()
    response, status = update_program_controller(
        program_code,
        data.get("program_code"),
        data.get("program_name"),
        data.get("college_code")
    )
    return jsonify(response), status

@program_bp.route("/delete/<string:program_code>", methods=["DELETE"])
@jwt_required()
def delete_program(program_code):
    valid_user = get_jwt_identity()
    if not valid_user:
        return jsonify({"message": "❌ Unauthorized"}), 401

    response, status = delete_program_controller(program_code)
    return jsonify(response), status

@program_bp.route("/getprograms", methods=["GET"])
@jwt_required()
def get_all_programs():
    valid_user = get_jwt_identity()
    if valid_user is None:
        return jsonify({"message": "❌ Unauthorized"}), 401
    
    return jsonify(get_programs_controller())