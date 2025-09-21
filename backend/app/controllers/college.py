from app.models.college import (add_college, get_colleges, update_college, delete_college)

def create_college(college_code, college_name):
    add_college(college_code=college_code, college_name=college_name)
    return {"status": "succeed"}

def fetch_college():
    return get_colleges()

def update_college(college_code, college_name):
    update_college(college_code=college_code, college_name=college_name)
    return {"status": "succeed"}

def delete_college(college_code):
    delete_college(college_code=college_code) 
    return {"status": "succeed"}