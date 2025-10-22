# Oracle

## Description
**Oracle** is a simple **Student Information Management System** developed for the course **CCC181 – Application Development and Emerging Technologies**.  
It uses a **Flask** backend, a **Next.js** frontend, and a **PostgreSQL** database to manage and display student records efficiently.

---

## Features
- Add, edit, and delete student records
- Organize students by program and college
- User authentication with JWT Cookies
- Responsive frontend built with Next.js

---

## Tech Stack
- **Backend:** Flask, Python  
- **Frontend:** Next.js, React  
- **Database:** PostgreSQL  
- **Authentication:** JWT  
- **Package Management:** pipenv, pnpm  

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repo-url>
cd <repo-folder>

```

### 2. Clone the Repository
Create a .env file in the root directory with the following variables:
```bash
DB_HOST='hostname'
DB_PORT='port'
DB_NAME='dbname'
DB_USER='user'
DB_PASSWORD='password'
SECRET_KEY='secretkey'
JWT_SECRET_KEY='jwtsecretkey'

```

### 3. Backend Setup (Flask)
Install pipenv (if not installed) and activate the environment:
```bash
pip install pipenv
pipenv shell
```
### 4. Initialize the database:
```bash
flask init-db

```

### 5. Run the Application
Return to the root directory and run the shell script:
```bash
chmod +x run.sh
./run.sh
