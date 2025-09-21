from flask_cors import CORS
from flask import jsonify, Blueprint, request
from app.controllers.college import (fetch_college, update_college, create_college, delete_college) 

college_bp = Blueprint('colleges', __name__, url_prefix='/colleges')

@college_bp.route('/', methods=['GET'])
def fetch_colleges():
    return jsonify(fetch_college())

@college_bp.route('/create', methods=['POST'])
def create_student():
    data = request.get_json()

    college_code = data.get("college_code")
    college_name = data.get("college_name")
    return jsonify(create_college(college_code, college_name))

@college_bp.route('/update/<int:college_code>', methods=['PUT'])
def update_student():
    return jsonify({'message': '✅ update_collegese route works!'})

@college_bp.route('/delete/<int:college_code>', methods=['DELETE'])
def delete_student():
    return jsonify({'message': '✅ delete_college route works!'})

