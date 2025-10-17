import psycopg2
from app.models.program import (
    add_programs_model, get_all_programs_model, update_programs_model,
    delete_programs_model, get_total_programs_model, get_all_programs_wo_filters_model
)

def create_program_controller(program_code, program_name, college_code):
    try:
        new_program = add_programs_model(program_code, program_name, college_code)
        if not new_program:
            return {"message": "❌ Program already exists"}, 400
        return {"message": "✅ Program created successfully", "program": new_program}, 201
    except Exception as e:
        print(f"Error creating program: {e}")
        return {"message": "⚠️ Internal server error"}, 500


def fetch_programs_controller(limit=10, offset=0, search=None, sort_by="program_code", order="ASC"):
    try:
        rows = get_all_programs_model(limit, offset, search, sort_by, order)
        total = get_total_programs_model(search)
        return {"rows": rows, "total": total}
    except Exception as e:
        print(f"Error fetching programs: {e}")
        return {"message": "⚠️ Internal server error"}, 500


def update_program_controller(current_program_code, new_program_code, new_program_name, new_college_code):
    try:
        updated_program = update_programs_model(current_program_code, new_program_code, new_program_name, new_college_code)

        if updated_program is None:
            return {"message": "❌ Program code already exists"}, 400
        if not updated_program:
            return {"message": f"⚠️ Program '{current_program_code}' not found"}, 404

        return {"message": "✅ Program updated successfully", "program": updated_program}, 200
    except Exception as e:
        print(f"Error updating program: {e}")
        return {"message": "⚠️ Internal server error"}, 500

def delete_program_controller(program_code):
    try:
        deleted_program = delete_programs_model(program_code)
        if not deleted_program:
            return {"message": f"⚠️ Program '{program_code}' not found"}, 404
        return {"message": "✅ Program deleted successfully"}, 200

    except psycopg2.errors.ForeignKeyViolation:
        return {"message": "❌ Cannot delete program with existing students."}, 400
    except Exception as e:
        print(f"Error deleting program: {e}")
        return {"message": "⚠️ Internal server error"}, 500

def get_programs_controller():
    try:
        programs = get_all_programs_wo_filters_model()
        return {"programs": programs}, 200
    except Exception as e:
        print(f"Error fetching programs: {e}")
        return {"message": "⚠️ Internal server error"}, 500
