-- Insert Colleges
INSERT INTO colleges (college_code, college_name)
VALUES
    ('CCS', 'College of Computer Studies'),
    ('COE', 'College of Engineering'),
    ('CBAA', 'College of Business Administration and Accountancy'),
    ('CAS', 'College of Arts and Sciences'),
    ('CON', 'College of Nursing')
ON CONFLICT (college_code) DO NOTHING;

-- Insert Programs
INSERT INTO programs (program_code, program_name, college_code)
VALUES
    ('BSCS', 'Bachelor of Science in Computer Science', 'CCS'),
    ('BSIT', 'Bachelor of Science in Information Technology', 'CCS'),
    ('BSEE', 'Bachelor of Science in Electrical Engineering', 'COE'),
    ('BSCE', 'Bachelor of Science in Civil Engineering', 'COE'),
    ('BSBA', 'Bachelor of Science in Business Administration', 'CBAA'),
    ('BSN',  'Bachelor of Science in Nursing', 'CON'),
    ('BSBIO', 'Bachelor of Science in Biology', 'CAS'),
    ('BSPHY', 'Bachelor of Science in Physics', 'CAS')
ON CONFLICT (program_code) DO NOTHING;

-- Insert Students (12,000)
DO $$
DECLARE
    gs INTEGER := 1;
    year_levels TEXT[] := ARRAY['1', '2', '3', '4', '4+'];
    genders TEXT[] := ARRAY['Male', 'Female', 'Other'];
    programs TEXT[] := ARRAY['BSCS', 'BSIT', 'BSEE', 'BSCE', 'BSBA', 'BSN', 'BSBIO', 'BSPHY'];
    first_names TEXT[] := ARRAY['John','Jane','Alex','Chris','Sam','Taylor','Jordan','Casey','Jamie','Morgan','Riley','Avery','Cameron','Charlie','Dakota','Emerson','Hayden','Reese','Skyler','Rowan'];
    last_names TEXT[] := ARRAY['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Martinez','Hernandez','Lopez','Gonzalez','Wilson','Anderson','Thomas','Taylor','Moore','Jackson','Martin','Lee'];
    sid TEXT;
BEGIN
    FOR gs IN 1..12000 LOOP
        sid := TO_CHAR(2025, 'FM0000') || '-' || LPAD(gs::TEXT, 4, '0');
        BEGIN
            INSERT INTO students (
                student_id, first_name, last_name, year_level, gender, program_code
            )
            VALUES (
                sid,
                first_names[(random() * array_length(first_names, 1) + 1)::INT],
                last_names[(random() * array_length(last_names, 1) + 1)::INT],
                year_levels[(random() * array_length(year_levels, 1) + 1)::INT]::year_level_enum,
                genders[(random() * array_length(genders, 1) + 1)::INT]::gender_enum,
                programs[(random() * array_length(programs, 1) + 1)::INT]
            )
            ON CONFLICT (student_id) DO NOTHING;  -- Prevent duplicates
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE 'Skipping duplicate or invalid record for %', sid;
        END;
    END LOOP;
END $$;
