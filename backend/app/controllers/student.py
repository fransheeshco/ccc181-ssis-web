import traceback
from app.models.student import (
    get_all_students_model,
    create_student_model,
    update_student_model,
    delete_student_model,
    get_total_students_model,
    update_student_photo_model,
    remove_student_photo_model
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
        # 1️⃣ If a photo is provided, try to upload it first
        file_name = None
        public_url = None
        if photo_file:
            photo_file.stream.seek(0)
            upload_result = upload_student_photo(photo_file)
            if "error" in upload_result:
                return {"error": upload_result["error"]}, 400

            file_name = upload_result["file_name"]
            public_url = upload_result["public_url"]

        # 2️⃣ Create student in DB
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

        created_student = result.copy()

        # 3️⃣ If photo was uploaded successfully, save photo info in DB
        if file_name and public_url:
            update_student_photo_model(
                student_id=result["student_id"],
                photo_file_name=file_name,
                photo_url=public_url
            )
            created_student["photo_url"] = public_url
            created_student["photo_file_name"] = file_name

        return {
            "message": "✅ Student added successfully",
            "student": created_student
        }, 200

    except Exception as e:
        print("Error creating student:", e)
        print(traceback.format_exc())
        return {"message": str(e)}, 500



def update_student_controller(
    current_student_id,
    new_student_id,
    new_first_name,
    new_last_name,
    new_year_level,
    new_gender,
    new_program_code,
    photo_file=None,
    remove_photo=False
):
    try:
        # 1️⃣ Update student basic info first
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

        student_id = result["student_id"]

        # 2️⃣ Handle removal first
        if remove_photo:
            # delete old file from Supabase
            remove_student_photo_model(student_id)

            # clear DB fields
            update_student_photo_model(student_id, None, None)

            result["photo_url"] = None

        # 3️⃣ Handle new uploaded photo
        if photo_file:
            # delete old file if it exists
            remove_student_photo_model(student_id)

            # upload new file
            photo_file.stream.seek(0)
            upload_result = upload_student_photo(photo_file)

            if "error" in upload_result:
                # Return early with the error
                print(upload_result["error"])
                return {"error": upload_result["error"]}, 400

            file_name = upload_result["file_name"]
            public_url = upload_result["public_url"]

            # update DB
            update_student_photo_model(student_id, file_name, public_url)

            result["photo_url"] = public_url

        return {
            "message": "✅ Student updated successfully",
            "student": result
        }, 200

    except Exception as e:
        print(f"Error updating student: {e}")
        return {"message": str(e)}, 500

def delete_student_controller(student_id):
    try:
        # 1️⃣ Remove photo from Supabase first
        remove_student_photo_model(student_id)

        # 2️⃣ Delete student record
        deleted = delete_student_model(student_id=student_id)
        if deleted is None:
            return {"error": "❌ Student not found"}, 404
        return {"message": "Student deleted"}, 200

    except psycopg2.IntegrityError as e:
        if e.pgcode == "23503":  # foreign key violation
            return {"error": "❌ Cannot delete student due to foreign key constraint"}, 409
        else:
            return {"error": "❌ Database integrity error"}, 400 

def remove_student_photo_controller(student_id):
    try:
        return remove_student_photo_model(student_id)
    except Exception as e:
        print("Error removing photo:", e)
        return {"error": "Internal server error"}

