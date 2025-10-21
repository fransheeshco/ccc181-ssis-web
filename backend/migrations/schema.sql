DROP TYPE IF EXISTS year_level_enum CASCADE;
DROP TYPE IF EXISTS gender_enum CASCADE;

CREATE TYPE year_level_enum AS ENUM ('1', '2', '3', '4', '4+');
CREATE TYPE gender_enum AS ENUM ('Male', 'Female', 'Other');

DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS programs CASCADE;
DROP TABLE IF EXISTS colleges CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE colleges (
    college_code VARCHAR(50) PRIMARY KEY,
    college_name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE programs (
    program_code VARCHAR(50) PRIMARY KEY,
    program_name VARCHAR(100) UNIQUE NOT NULL,
    college_code VARCHAR(50),
    FOREIGN KEY (college_code)
        REFERENCES colleges (college_code)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE students (
    student_id VARCHAR(20) PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    year_level year_level_enum NOT NULL,
    gender gender_enum NOT NULL,
    program_code VARCHAR(50),
    FOREIGN KEY (program_code)
        REFERENCES programs (program_code)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    CONSTRAINT student_id_format CHECK (student_id ~ '^[0-9]{4}-[0-9]{4}$')
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(20) UNIQUE,
    email VARCHAR(50),
    user_password VARCHAR(150) NOT NULL
);