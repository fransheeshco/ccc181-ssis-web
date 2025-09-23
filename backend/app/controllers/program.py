from app.models.program import (add_programs_model, get_all_programs_model, update_programs_model, delete_programs_model)

def create_program_controller(program_code, program_name, college_code):
    add_programs_model(program_code=program_code, program_name=program_name, college_code=college_code)
    return {"message": "✅ Program added successfully"}

def fetch_programs_controller():
    return get_all_programs_model()

def update_program_controller(current_program_code, new_program_code, new_program_name, new_college_code):
    rowcount = update_programs_model(current_program_code, new_program_code, new_program_name, new_college_code)
    if rowcount == 0:
        return {
            "error": f"⚠️ Program '{current_program_code}' not found"
        }
    return {"message": "✅ Program updated successfully"}

def delete_program_controller(program_code):
    rowcount = delete_programs_model(program_code) 
    if rowcount == 0:
        return {"error": f"⚠️ Program '{program_code}' not found"}
    return {"message": "✅ Program deleted successfully"}
