from app.models.college import (add_college_model, get_colleges_model, update_college_model, delete_college_model)

def create_college_controller(college_code, college_name):
    new_college = add_college_model(college_code=college_code, college_name=college_name)
    if not new_college:
        return {"message": "❌ College already exists"}, 400
    return {"message": "✅ College added successfully"}, 200

def fetch_college_controller():
    return get_colleges_model()

def update_college_controller(current_code, new_college_code, new_college_name):
    rowcount = update_college_model(new_college_code, new_college_name, current_code)
    if rowcount == 0:
        return {
            "error": f"⚠️ College '{current_code}' not found"
        }
    return {"message": "✅ College updated successfully"}

def delete_college_controller(college_code):
    rowcount = delete_college_model(college_code) 
    if rowcount == 0:
        return {"error": f"⚠️ College '{college_code}' not found"}
    return {"message": "✅ College deleted successfully"}
