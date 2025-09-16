from flask_cors import CORS
from flask import jsonify, Flask, request, Blueprint

college_bp = Blueprint('colleges', __name__, url_prefix='/colleges')

@college_bp.route('/', methods=['GET'])
def fetch_colleges():
    return jsonify({'message': '✅ fetch_colleges route works!'})

@college_bp.route('/create', methods=['POST'])
def create_student():
    return jsonify({'message': '✅ create_college route works!'})

@college_bp.route('/update/<int:college_code>', methods=['PUT'])
def update_student():
    return jsonify({'message': '✅ update_collegese route works!'})

@college_bp.route('/delete/<int:college_code>', methods=['DELETE'])
def delete_student():
    return jsonify({'message': '✅ delete_college route works!'})

