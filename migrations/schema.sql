-- Drop types if they already exist
DROP TYPE IF EXISTS year_level_enum CASCADE;
DROP TYPE IF EXISTS gender_enum CASCADE;

-- Create enums
CREATE TYPE year_level_enum AS ENUM ('1', '2', '3', '4', '4+');
CREATE TYPE gender_enum AS ENUM ('Male', 'Female', 'Other');

-- Create tables
DROP TABLE IF EXISTS college CASCADE;
DROP TABLE IF EXISTS programs CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE college (
    college_code VARCHAR(50) UNIQUE PRIMARY KEY NOT NULL,
    college_name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE programs (
    program_code VARCHAR(50) UNIQUE NOT NULL PRIMARY KEY,
    program_name VARCHAR(100) UNIQUE NOT NULL,
    college_code VARCHAR(50) NOT NULL REFERENCES college(college_code) ON DELETE CASCADE    
);

CREATE TABLE students (
    student_id VARCHAR(20) UNIQUE PRIMARY KEY ,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    year_level year_level_enum NOT NULL,
    gender gender_enum NOT NULL,
    program_code VARCHAR(50) REFERENCES programs(program_code) ON DELETE SET NULL,
    CONSTRAINT student_id_format CHECK (student_id ~ '^[0-9]{4}-[0-9]{4}$')
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(20) UNIQUE,
    email VARCHAR(50),
    user_password VARCHAR(150) NOT NULL
);