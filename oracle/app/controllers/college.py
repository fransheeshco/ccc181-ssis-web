import psycopg2
from app.models.college import (
    add_college_model, get_all_colleges_model, get_total_colleges_model,
    get_colleges_model, update_college_model, delete_college_model
)
# ------------------- COLLEGES -------------------

def create_college_controller(college_code, college_name):
    try:
        result = add_college_model(college_code, college_name)

        # If model returned an error, pass it along
        if "error" in result:
            return result, 400

        return {"message": "✅ College added successfully"}, 201

    except Exception as e:
        print(f"Error creating college: {e}")
        return {"error": "⚠️ Internal server error"}, 500

def fetch_college_controller(limit=10, offset=0, search=None, sort_by="college_code", order="ASC"):
    try:
        rows = get_colleges_model(limit, offset, search, sort_by, order)
        total = get_total_colleges_model(search)
        return {"rows": rows, "total": total}
    except Exception as e:
        print(f"Error fetching colleges: {e}")
        return {"rows": [], "total": 0}


def get_total_colleges_controller(search=None):
    try:
        total = get_total_colleges_model(search)
        return total
    except Exception as e:
        print(f"Error fetching total colleges: {e}")
        return None

def update_college_controller(current_code, new_code, new_name):
    try:
        result = update_college_model(current_code, new_code, new_name)

        if "error" in result:
            return result, 400

        return {"message": "✅ College updated successfully"}, 200

    except Exception as e:
        print(f"Error updating college: {e}")
        return {"message": "⚠️ Internal server error"}, 500

def delete_college_controller(college_code):
    try:
        deleted_row = delete_college_model(college_code)

        if not deleted_row:
            return {"message": f"⚠️ College '{college_code}' not found"}, 404

        return {"message": "✅ College deleted successfully"}, 200

    except psycopg2.errors.ForeignKeyViolation:
        # College still has dependent programs (foreign key constraint)
        return {"message": "❌ Cannot delete college with existing programs."}, 400

    except Exception as e:
        print(f"Error deleting college: {e}")
        return {"message": "⚠️ Internal server error"}, 500


def get_all_colleges_controller():
    colleges = get_all_colleges_model()
    return colleges
