from app.models.program import (add_programs_model, get_all_programs_model, update_programs_model, delete_programs_model, get_total_programs_model)

def create_program_controller(program_code, program_name, college_code):
    try:
        new_program = add_programs_model(program_code, program_name, college_code)
        if not new_program:
            return {"message": "❌ Program already exists"}, 400
        return {"message": "✅ Program created successfully", "program": new_program}, 201
    except Exception as e:
        return {"error": f"❌ {str(e)}"}, 400

def fetch_programs_controller(limit=10, offset=0, search=None, sort_by="program_code", order="ASC"):
    try:
        rows = get_all_programs_model(limit, offset, search, sort_by, order)
        total = get_total_programs_model(search)
        return {"rows": rows, "total": total}
    except Exception as e:
        return {"error": f"❌ {str(e)}"}, 400

def update_program_controller(current_program_code, new_program_code, new_program_name, new_college_code):
    try: 
        rowcount = update_programs_model(current_program_code, new_program_code, new_program_name, new_college_code)
        if rowcount == 0:
            return {
                "error": f"⚠️ Program '{current_program_code}' not found"
            }
        return {"message": "✅ Program updated successfully"}
    except Exception as e:
        return {"error": f"❌ {str(e)}"}, 400

def delete_program_controller(program_code):
    try:
        rowcount = delete_programs_model(program_code)
        if rowcount == 0:
            return {"error": f"⚠️ Program '{program_code}' not found"}
    except Exception as e:
        return {"error": f"❌ {str(e)}"}, 400
    return {"message": "✅ Program deleted successfully"}
