from flask_cors import CORS
from flask import jsonify, Flask, request, Blueprint

program_bp = Blueprint('programs', __name__, url_prefix='/programs')

@program_bp.route('/', methods=['GET'])
def fetch_programs():
    return jsonify({'message': '✅ fetch_programs route works!'})

@program_bp.route('/create', methods=['POST'])
def create_program():
    return jsonify({'message': '✅ create_program route works!'})

@program_bp.route('/update/<int:program_code>', methods=['PUT'])
def update_program():
    return jsonify({'message': '✅ update_program route works!'})

@program_bp.route('/delete/<int:program_code>', methods=['DELETE'])
def delete_program():
    return jsonify({'message': '✅ delete_program route works!'})

