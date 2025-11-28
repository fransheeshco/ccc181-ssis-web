import traceback
from app.models.student import (
    get_all_students_model,
    create_student_model,
    update_student_model,
    delete_student_model,
    get_total_students_model,
    update_student_photo_model
)

from app.lib.supabaseclient import (
    upload_student_photo
)
import psycopg2


def fetch_students_controller(limit=10, offset=0, search=None, sort_by="student_id", order="ASC"):
    try:
        rows = get_all_students_model(limit, offset, search, sort_by, order)
        total = get_total_students_model(search)
        return {"rows": rows, "total": total}
    except psycopg2.Error as e:
        return {"error": f"Database error: {e}"}, 500

def create_student_controller(student_id, first_name, last_name, year_level, gender, program_code, photo_file=None):
    try:
        result = create_student_model(
            student_id=student_id,
            first_name=first_name,
            last_name=last_name,
            year_level=year_level,
            gender=gender,
            program_code=program_code
        )

        if "error" in result:
            return result, 400  

        if photo_file:
            # Upload to Supabase FIRST
            photo_file.stream.seek(0)  # reset pointer
            photo_url = upload_student_photo(result["student_id"], photo_file)

            if not photo_url:
                return {"error": "Failed to upload photo"}, 500

            # Now save the URL in the database
            update_student_photo_model(result["student_id"], photo_url)

            result["photo_url"] = photo_url

        if "error" in result:
            return result, 400
        return {"message": "✅ Student added successfully"}, 200

    except Exception as e:
        print(f"Error updating program: {e}")
        print(traceback.format_exc())  
        return {"message": "⚠️ Internal server error"}, 500


def update_student_controller(new_student_id, new_first_name, new_last_name, new_year_level, new_gender, new_program_code, current_student_id, photo_file=None):
    try:
        result = update_student_model(
            current_student_id=current_student_id,
            new_student_id=new_student_id,
            new_first_name=new_first_name,
            new_last_name=new_last_name,
            new_year_level=new_year_level,
            new_gender=new_gender,
            new_program_code=new_program_code,
        )
        
        if "error" in result:
            return result, 400
        
        if photo_file:
            # Upload to Supabase FIRST
            photo_file.stream.seek(0)  # reset pointer
            photo_url = upload_student_photo(result["student_id"], photo_file)

            if not photo_url:
                return {"error": "Failed to upload photo"}, 500

            # Now save the URL in the database
            update_student_photo_model(result["student_id"], photo_url)

            result["photo_url"] = photo_url
        
        return {"message": "✅ Student updated successfully"}, 200

    except Exception as e:
        print(f"Error updating program: {e}")
        return {"message": "⚠️ Internal server error"}, 500


def delete_student_controller(student_id):
    try:
        deleted = delete_student_model(student_id=student_id)
        if deleted is None:
            return {"error": "❌ Student not found"}, 404
        return {"message": "Student deleted"}, 200

    except psycopg2.IntegrityError as e:
        if e.pgcode == "23503":  # foreign key violation (if students are linked elsewhere)
            return {"error": "❌ Cannot delete student due to foreign key constraint"}, 409
        else:
            return {"error": "❌ Database integrity error"}, 400    
        
