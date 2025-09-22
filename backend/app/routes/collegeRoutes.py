from flask_cors import CORS
from flask import jsonify, Blueprint, request
from app.controllers.college import (fetch_college, update_college, create_college, delete_college_model) 

college_bp = Blueprint('colleges', __name__, url_prefix='/colleges')

@college_bp.route('/', methods=['GET'])
def fetch_colleges():
    return jsonify(fetch_college())

@college_bp.route('/create', methods=['POST'])
def create_college():
    data = request.get_json()

    college_code = data.get("college_code")
    college_name = data.get("college_name")
    return jsonify(create_college(college_code, college_name))

@college_bp.route("/update/<string:college_code>", methods=["PUT"])
def update_college_route(college_code):
    data = request.get_json()
    new_code = data.get("college_code")     
    new_name = data.get("college_name")
    return jsonify(update_college(college_code, new_code, new_name))

@college_bp.route('/delete/<string:college_code>', methods=['DELETE'])
def delete_college(college_code):
    deleted = delete_college_model(college_code)
    if deleted:
        return jsonify({"message": "College deleted", "deleted": dict(deleted)})
    else:
        return jsonify({"error": "College not found"}), 404


