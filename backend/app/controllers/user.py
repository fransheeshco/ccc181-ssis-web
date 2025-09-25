from app.models.user import create_user_model, login_user_model
from flask import request, jsonify
from flask_jwt_extended import create_access_token

def register_user_controller(username, email, password):
    new_user = create_user_model(username=username, email=email, password=password)
    if not new_user:
        return {"message": "❌ User already exists"}, 400
    return {"message": "✅ User registered successfully"}, 200

def login_user_controller(email, password):
    user = login_user_model(email=email, password=password)
    if not user:
        return {"message": "❌ Invalid email or password"}, 401
    
    access_token = create_access_token(
        identity=str(user["user_id"]),
        additional_claims={"email": user["email"]}
    )

    return {"message": "✅ Login successful", "access_token": access_token}, 200


