from flask_cors import CORS
from flask import jsonify, Flask, request, Blueprint

student_bp = Blueprint('students', __name__, url_prefix='/students')

@student_bp.route('/', methods=['GET'])
def fetch_students():
    return jsonify({'message': '✅ fetch_students route works!'})

@student_bp.route('/create', methods=['POST'])
def create_student():
    return jsonify({'message': '✅ create_students route works!'})

@student_bp.route('/update/<int:student_id>', methods=['PUT'])
def update_student():
    return jsonify({'message': '✅ update_student route works!'})

@student_bp.route('/delete/<int:student_id>', methods=['DELETE'])
def delete_student():
    return jsonify({'message': '✅ delete_student route works!'})

