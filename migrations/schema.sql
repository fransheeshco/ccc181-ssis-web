-- Drop types if they already exist
DROP TYPE IF EXISTS year_level_enum CASCADE;
DROP TYPE IF EXISTS gender_enum CASCADE;

-- Create enums first
CREATE TYPE year_level_enum AS ENUM ('1', '2', '3', '4', '4+');
CREATE TYPE gender_enum AS ENUM ('Male', 'Female', 'Other');

-- Now create tables
DROP TABLE IF EXISTS college CASCADE;
DROP TABLE IF EXISTS programs CASCADE;
DROP TABLE IF EXISTS students CASCADE;

CREATE TABLE college (
    college_code VARCHAR(50) UNIQUE PRIMARY KEY NOT NULL,
    college_name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE programs (
    program_code VARCHAR(50) UNIQUE PRIMARY KEY NOT NULL,
    program_name VARCHAR(100) UNIQUE NOT NULL,
    college_code VARCHAR(50) NOT NULL REFERENCES college(college_code) ON DELETE CASCADE    
);

CREATE TABLE students (
    student_id VARCHAR(20) PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    year_level year_level_enum NOT NULL,
    gender gender_enum NOT NULL,
    program_code VARCHAR(50) NOT NULL REFERENCES programs(program_code) ON DELETE CASCADE
);
