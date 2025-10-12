from app.models.college import (add_college_model, get_all_colleges_model, get_total_colleges_model, get_colleges_model, update_college_model, delete_college_model)

def create_college_controller(college_code, college_name):
    new_college = add_college_model(college_code=college_code, college_name=college_name)
    if not new_college:
        return {"message": "❌ College already exists"}, 400
    return {"message": "✅ College added successfully"}, 200

def fetch_college_controller(limit=10, offset=0, search=None, sort_by="college_code", order="ASC"):
    try:
        rows = get_colleges_model(limit, offset, search, sort_by, order)
        total = get_total_colleges_model(search)
        print(rows, total)
        return {"rows": rows, "total": total}
    except Exception as e:
        print(f"Error fetching colleges: {e}")
        return {"rows": [], "total": 0}

    
def get_total_colleges_controller(search=None):
    try:
        total = get_total_colleges_model(search)
        return total
    except Exception as e:
        print(f"Error fetching total colleges: {e}")  # optional logging
        return None

def update_college_controller(new_college_code, new_college_name, current_code):
    rowcount = update_college_model(
        new_college_code=new_college_code,
        new_college_name=new_college_name,
        curr_code=current_code
    )

    if rowcount == 0:
        return {
            "error": f"⚠️ College '{current_code}' not found"
        }
    return {
        "new_code": new_college_code,
        "new_name": new_college_name
    }

def delete_college_controller(college_code):
    rowcount = delete_college_model(college_code) 
    if rowcount == 0:
        return {"error": f"⚠️ College '{college_code}' not found"}
    return {"message": "✅ College deleted successfully"}

def get_all_colleges_controller():
    colleges = get_all_colleges_model()
    return colleges