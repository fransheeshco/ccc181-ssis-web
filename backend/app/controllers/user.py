from app.models.user import create_user_model, login_user_model
from flask import request, jsonify
from flask_jwt_extended import (
    create_access_token, create_refresh_token,
    set_access_cookies, set_refresh_cookies,
    unset_jwt_cookies, jwt_required, get_jwt_identity,
    get_csrf_token
)

def register_user_controller(username, email, password):
    new_user = create_user_model(username=username, email=email, password=password)
    if not new_user:
        return {"message": "❌ User already exists"}, 400
    return {"message": "✅ User registered successfully"}, 200

def login_user_controller(email, password):
    user = login_user_model(email=email, password=password)
    if not user:
        return jsonify({"message": "❌ Invalid email or password"}), 401
    
    # Step 1: create tokens
    access_token = create_access_token(
        identity=str(user["user_id"]),
        additional_claims={"email": user["email"]}
    )
    refresh_token = create_refresh_token(
        identity=str(user["user_id"]),
        additional_claims={"email": user["email"]}
    )

    # Step 2: build response
    resp = jsonify({
        "message": "✅ Login successful",
        "user": {
            "user_id": str(user["user_id"]),
            "email": user["email"]
        }
    })

    # Step 3: attach cookies
    set_access_cookies(resp, access_token, max_age=15*60)  # 15 minutes
    set_refresh_cookies(resp, refresh_token, max_age=7*24*60*60)  # 7 days
    print(resp)
    return resp, 200


def refresh_token_controller():
    current_user = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user)
    resp = jsonify({
        "message": "🔄 Token refreshed",
        "user": {
            "user_id": current_user,  # if you store more info, expand this
        }
    })
    set_access_cookies(resp, new_access_token, max_age=15*60)  # 15 minutes
    print(resp)
    return resp, 200

def logout_user_controller():
    resp = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(resp)
    return resp, 200


