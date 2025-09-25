from app.models.student import (
    get_all_students_model,
    create_student_model,
    update_student_model,
    delete_student_model
)
import psycopg2


def fetch_students_controller():
    try:
        students = get_all_students_model()
        return {"students": students}, 200
    except psycopg2.Error as e:
        return {"error": f"Database error: {e}"}, 500

def create_student_controller(student_id, first_name, last_name, year_level, gender, program_code):
    try:
        new_student = create_student_model(
            student_id=student_id,
            first_name=first_name,
            last_name=last_name,
            year_level=year_level,
            gender=gender,
            program_code=program_code
        )
        return {"message": "✅ Student created successfully", "student": new_student}, 201

    except psycopg2.IntegrityError as e:
        if e.pgcode == "23505":  # unique violation
            return {"error": "❌ Student ID already exists"}, 409
        elif e.pgcode == "23503":  # foreign key violation
            return {"error": "❌ Invalid program code"}, 400
        elif e.pgcode == "23502":  # not null violation
            return {"error": "❌ Missing required field"}, 400
        else:
            return {"error": "❌ Database integrity error"}, 400


def update_student_controller(new_student_id, new_first_name, new_last_name, new_year_level, new_gender, new_program_code, current_student_id):
    try:
        updated_student = update_student_model(
            current_student_id=current_student_id,
            new_student_id=new_student_id,
            new_first_name=new_first_name,
            new_last_name=new_last_name,
            new_year_level=new_year_level,
            new_gender=new_gender,
            new_program_code=new_program_code
        )
        if updated_student is None:
            return {"error": "Student not found"}, 404
        return {"message": "Student successfully updated", "student": updated_student}, 200

    except psycopg2.IntegrityError as e:
        if e.pgcode == "23505":
            return {"error": "❌ Student ID already exists"}, 409
        elif e.pgcode == "23503":
            return {"error": "❌ Invalid program code"}, 400
        elif e.pgcode == "23502":
            return {"error": "❌ Missing required field"}, 400
        else:
            return {"error": "❌ Database integrity error"}, 400


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
