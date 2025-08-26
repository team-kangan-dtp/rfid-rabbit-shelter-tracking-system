-- ANIMAL SHELTER DATABASE SCHEMA
-- 
-- Updated schema with integrated user/volunteer management system
-- Integrates with Supabase authentication for user management
-- Includes comprehensive animal tracking, adoption, and veterinary care
--
-- STRUCTURE:
-- - User management (linked to Supabase auth) - includes volunteer fields
-- - Simplified shift management (2 tables: shift_type, shift)
-- - Animal management with health tracking
-- - Adoption process management
-- - Veterinary care tracking

-- =====================================================
-- CLEANUP - Remove existing tables and functions
-- =====================================================
DROP TABLE IF EXISTS health_check CASCADE;
DROP TABLE IF EXISTS vet CASCADE;
DROP TABLE IF EXISTS adoption CASCADE;
DROP TABLE IF EXISTS adopter CASCADE;
DROP TABLE IF EXISTS animal_note CASCADE;
DROP TABLE IF EXISTS animal CASCADE;
-- Remove old volunteer tables
DROP TABLE IF EXISTS volunteer_interest CASCADE;
DROP TABLE IF EXISTS area_of_interest CASCADE;
DROP TABLE IF EXISTS volunteer_role CASCADE;
DROP TABLE IF EXISTS volunteer CASCADE;
DROP TABLE IF EXISTS shift CASCADE;
DROP TABLE IF EXISTS shift_type CASCADE;
DROP TABLE IF EXISTS role CASCADE;
DROP TABLE IF EXISTS rfid_log CASCADE;
DROP FUNCTION IF EXISTS handle_new_user CASCADE;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;

-- =====================================================
-- USER MANAGEMENT SYSTEM (INCLUDES VOLUNTEER DATA)
-- =====================================================

-- USER TABLE
-- Links to Supabase auth.users and includes volunteer information
CREATE TABLE "user" (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    date_of_birth DATE,
    address_line VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(50),
    postal_code VARCHAR(20),
    rfid_tag VARCHAR(50) UNIQUE,        -- For RFID access system
    
    -- Volunteer-specific fields
    volunteer_start_date DATE,          -- Date volunteer started
    volunteer_end_date DATE,            -- Date volunteer stopped (NULL if active)
    is_admin BOOLEAN DEFAULT FALSE, -- Whether user is a volunteer
    is_active_volunteer BOOLEAN DEFAULT TRUE, -- Whether volunteer is currently active
    volunteer_notes TEXT,               -- General notes about the volunteer
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- FUNCTION: Auto-create user profile when new auth user is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
    INSERT INTO public.user (id, email, first_name, last_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'last_name', '')
    );
    RETURN NEW;
END;
$$;

-- TRIGGER: Automatically create user profile on auth user creation
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- =====================================================
-- SIMPLIFIED SHIFT MANAGEMENT SYSTEM (2 TABLES)
-- =====================================================

-- SHIFT_TYPE TABLE
-- Predefined shift periods and common patterns
CREATE TABLE shift_type (
    type_name VARCHAR(50) PRIMARY KEY,
    default_start TIME NOT NULL,
    default_end TIME NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

-- SHIFT TABLE
-- Main shift data tracking actual volunteer work periods
CREATE TABLE shift (
    shift_id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    shift_type VARCHAR(50) NOT NULL REFERENCES shift_type(type_name),
    shift_date DATE NOT NULL,
    actual_start TIME,
    actual_end TIME,
    primary_role VARCHAR(100),
    duties_performed TEXT[],
    status VARCHAR(20) DEFAULT 'Scheduled' CHECK (status IN ('Scheduled', 'In Progress', 'Completed', 'No Show', 'Cancelled')),
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    -- Prevent double-booking
    UNIQUE(user_id, shift_date, shift_type)
);

-- =====================================================
-- ANIMAL MANAGEMENT SYSTEM
-- =====================================================

-- ANIMAL TABLE
-- Core table storing all animals in the shelter system
CREATE TABLE animal (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    species VARCHAR(50) NOT NULL,
    breed VARCHAR(100),
    fur_colour VARCHAR(50),
    weight_kg DECIMAL(5,2),
    arrival_date DATE NOT NULL,
    neutered BOOLEAN DEFAULT FALSE,
    adoption_status VARCHAR(20) DEFAULT 'Available' CHECK (adoption_status IN ('Available', 'Pending', 'Adopted', 'Hold', 'Medical Hold', 'Not Available')),
    bonded_with UUID REFERENCES animal(id),
    rfid_tag VARCHAR(50) UNIQUE,        -- For RFID tracking
    special_needs TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ANIMAL_NOTE TABLE
-- Notes written by volunteers about specific animals
CREATE TABLE animal_note (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    animal_id UUID NOT NULL REFERENCES animal(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    note_date DATE NOT NULL DEFAULT CURRENT_DATE,
    note_content TEXT NOT NULL,
    note_type VARCHAR(50) DEFAULT 'General' CHECK (note_type IN ('General', 'Behavioral', 'Medical', 'Feeding', 'Exercise', 'Grooming', 'Training')),
    created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- ADOPTION SYSTEM
-- =====================================================

-- ADOPTER TABLE
-- Information about people who adopt or want to adopt animals
CREATE TABLE adopter (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20) NOT NULL,
    address_line_1 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(50),
    postal_code VARCHAR(20),
    date_of_birth DATE,
    household_size INTEGER,
    has_other_pets BOOLEAN DEFAULT FALSE,
    adoption_status VARCHAR(30) DEFAULT 'Potential' CHECK (adoption_status IN ('Potential', 'Approved', 'Rejected', 'Blacklisted')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ADOPTION TABLE
-- Records of animal adoptions
CREATE TABLE adoption (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    animal_id UUID NOT NULL REFERENCES animal(id) ON DELETE RESTRICT,
    adopter_id UUID NOT NULL REFERENCES adopter(id) ON DELETE RESTRICT,
    adoption_date DATE NOT NULL DEFAULT CURRENT_DATE,
    adoption_fee DECIMAL(8,2) NOT NULL,
    return_date DATE,
    return_reason TEXT,
    adoption_status VARCHAR(20) DEFAULT 'Active' CHECK (adoption_status IN ('Active', 'Returned', 'Cancelled')),
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- VETERINARY CARE SYSTEM
-- =====================================================

-- VET TABLE
-- Information about veterinary professionals
CREATE TABLE vet (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(50) NOT NULL CHECK (title IN ('Veterinary Doctor', 'Veterinary Nurse', 'Veterinary Technician', 'Veterinary Assistant')),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20) NOT NULL,
    clinic_name VARCHAR(200),
    clinic_address VARCHAR(500),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- HEALTH_CHECK TABLE
-- Medical examinations performed by vets on animals
CREATE TABLE health_check (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    animal_id UUID NOT NULL REFERENCES animal(id) ON DELETE CASCADE,
    vet_id UUID NOT NULL REFERENCES vet(id) ON DELETE RESTRICT,
    check_date DATE NOT NULL DEFAULT CURRENT_DATE,
    check_type VARCHAR(50) NOT NULL,
    weight_kg DECIMAL(5,2),
    temperature_celsius DECIMAL(4,1),
    heart_rate INTEGER,
    examination_notes TEXT,
    diagnosis TEXT,
    treatment_given TEXT,
    medications_prescribed TEXT,
    follow_up_required BOOLEAN DEFAULT FALSE,
    follow_up_date DATE,
    overall_health_status VARCHAR(20) DEFAULT 'Good' CHECK (overall_health_status IN ('Excellent', 'Good', 'Fair', 'Poor', 'Critical')),
    created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- RFID ACCESS LOG TABLE
-- =====================================================

-- RFID_LOG TABLE
-- Tracks RFID scans for volunteers and animals
CREATE TABLE rfid_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scan_time TIMESTAMP DEFAULT NOW() NOT NULL,
    user_id UUID REFERENCES "user"(id),     -- User who scanned (volunteer)
    animal_id UUID REFERENCES animal(id),   -- Animal that was scanned
    rfid_tag VARCHAR(50),
    animal_note UUID REFERENCES animal_note(id) ON DELETE SET NULL -- Note associated with the scan
);

-- Enable realtime for rfid_log table
ALTER PUBLICATION supabase_realtime ADD TABLE rfid_log;

-- =====================================================
-- SEED DATA
-- =====================================================

-- -- Insert shift types
-- INSERT INTO shift_type (type_name, default_start, default_end, description) VALUES
-- ('Early Morning', '04:00', '07:00', 'Early morning feeding and initial care'),
-- ('Morning', '07:00', '12:00', 'Morning care, cleaning, and activities'),
-- ('Afternoon', '12:00', '17:00', 'Afternoon care, exercise, and socialization'),
-- ('Evening', '17:00', '21:00', 'Evening feeding, cleaning, and settling'),
-- ('Night', '21:00', '04:00', 'Overnight monitoring and emergency care');

-- -- Insert sample users (including volunteers)
-- -- IMPORTANT: These UUIDs should match actual Supabase auth.users records in production
-- INSERT INTO "user" (id, email, first_name, last_name, phone, city, state, country, rfid_tag, work_email, volunteer_start_date, area_of_interest, is_volunteer, emergency_contact_name, emergency_contact_phone) VALUES
-- ('11111111-1111-1111-1111-111111111111', 'sarah.johnson@example.com', 'Sarah', 'Johnson', '0412345678', 'Melbourne', 'VIC', 'Australia', 'RFID001', 'sarah.j@shelter.org', '2024-01-15', 'Animal Care', TRUE, 'John Johnson', '0456789012'),
-- ('22222222-2222-2222-2222-222222222222', 'mike.chen@example.com', 'Mike', 'Chen', '0423456789', 'Sydney', 'NSW', 'Australia', 'RFID002', 'mike.c@shelter.org', '2024-02-20', 'Veterinary', TRUE, 'Lisa Chen', '0467890123'),
-- ('33333333-3333-3333-3333-333333333333', 'emma.brown@example.com', 'Emma', 'Brown', '0434567890', 'Brisbane', 'QLD', 'Australia', 'RFID003', 'emma.b@shelter.org', '2024-03-10', 'Social Media', TRUE, 'Tom Brown', '0478901234'),
-- ('44444444-4444-4444-4444-444444444444', 'james.wilson@example.com', 'James', 'Wilson', '0445678901', 'Perth', 'WA', 'Australia', 'RFID004', 'james.w@shelter.org', '2024-01-05', 'Administration', TRUE, 'Mary Wilson', '0489012345');

-- -- Insert sample shifts (now referencing user_id instead of volunteer_id)
-- INSERT INTO shift (user_id, shift_type, shift_date, actual_start, actual_end, primary_role, duties_performed, status, notes) VALUES
-- ('11111111-1111-1111-1111-111111111111', 'Morning', '2024-12-01', '07:00', '12:00', 'General Care', ARRAY['Fed all animals', 'Cleaned enclosures', 'Exercise time for rabbits'], 'Completed', 'All tasks completed successfully'),
-- ('22222222-2222-2222-2222-222222222222', 'Afternoon', '2024-12-01', '12:15', '17:00', 'Vet Assistant', ARRAY['Assisted with vaccinations', 'Updated health records'], 'Completed', 'Helped with 3 health checks'),
-- ('33333333-3333-3333-3333-333333333333', 'Evening', '2024-12-01', '17:00', '21:00', 'Social Media', ARRAY['Posted adoption photos', 'Updated website'], 'Completed', 'Posted 3 new rabbit profiles'),
-- ('11111111-1111-1111-1111-111111111111', 'Morning', '2024-12-02', NULL, NULL, 'General Care', ARRAY[], 'Scheduled', 'Upcoming shift'),
-- ('44444444-4444-4444-4444-444444444444', 'Afternoon', '2024-12-02', NULL, NULL, 'Administration', ARRAY[], 'Scheduled', 'Adoption counseling sessions planned');

-- -- Insert sample animals
-- INSERT INTO animal (name, date_of_birth, species, breed, fur_colour, weight_kg, arrival_date, neutered, adoption_status, microchip_number, rfid_tag, description) VALUES
-- ('Buddy', '2020-03-15', 'Rabbit', 'Holland Lop', 'Brown', 2.1, '2024-01-10', TRUE, 'Available', 'MC123456789', 'RFID_A001', 'Friendly and energetic rabbit, great with kids'),
-- ('Whiskers', '2021-07-22', 'Rabbit', 'Mini Rex', 'Gray', 1.8, '2024-02-05', TRUE, 'Available', 'MC987654321', 'RFID_A002', 'Calm indoor rabbit, loves to explore'),
-- ('Charlie', '2019-11-08', 'Rabbit', 'Flemish Giant', 'Black and White', 4.5, '2024-01-20', FALSE, 'Pending', 'MC456789123', 'RFID_A003', 'Large gentle rabbit, needs experienced owner'),
-- ('Luna', '2022-05-30', 'Rabbit', 'Angora', 'White', 2.2, '2024-03-01', TRUE, 'Available', 'MC789123456', 'RFID_A004', 'Fluffy rabbit, requires daily grooming'),
-- ('Rocky', '2018-09-12', 'Rabbit', 'Dutch', 'Brown and White', 2.8, '2024-01-15', TRUE, 'Adopted', 'MC321654987', 'RFID_A005', 'Active and social rabbit');

-- -- Set bonded pair
-- UPDATE animal SET bonded_with = (SELECT id FROM animal WHERE name = 'Whiskers') WHERE name = 'Luna';

-- -- Insert sample adopters
-- INSERT INTO adopter (first_name, last_name, email, phone, city, state, country, housing_type, owns_or_rents, adoption_status) VALUES
-- ('David', 'Miller', 'david.miller@email.com', '0456123789', 'Melbourne', 'VIC', 'Australia', 'House', 'Owns', 'Approved'),
-- ('Jessica', 'Taylor', 'jessica.taylor@email.com', '0467234890', 'Sydney', 'NSW', 'Australia', 'Apartment', 'Rents', 'Approved'),
-- ('Robert', 'Anderson', 'robert.anderson@email.com', '0478345901', 'Brisbane', 'QLD', 'Australia', 'Townhouse', 'Owns', 'Potential');

-- -- Insert sample adoption
-- INSERT INTO adoption (animal_id, adopter_id, adoption_date, adoption_fee, adoption_status, notes) VALUES
-- ((SELECT id FROM animal WHERE name = 'Rocky'), (SELECT id FROM adopter WHERE email = 'david.miller@email.com'), '2024-02-15', 150.00, 'Active', 'Great match, adopter has experience with rabbits');

-- -- Insert sample vets
-- INSERT INTO vet (title, first_name, last_name, email, phone, clinic_name, license_number, specialization) VALUES
-- ('Veterinary Doctor', 'Dr. Amanda', 'Smith', 'amanda.smith@vetclinic.com', '0398765432', 'Melbourne Animal Hospital', 'VET12345', 'Small Animals'),
-- ('Veterinary Nurse', 'Rachel', 'Davis', 'rachel.davis@vetclinic.com', '0387654321', 'Melbourne Animal Hospital', 'VN67890', 'General Care'),
-- ('Veterinary Doctor', 'Dr. Mark', 'Thompson', 'mark.thompson@exoticvets.com', '0376543210', 'Exotic Pet Specialists', 'VET54321', 'Exotic Pets');

-- -- Insert sample health checks
-- INSERT INTO health_check (animal_id, vet_id, check_date, check_type, weight_kg, examination_notes, overall_health_status) VALUES
-- ((SELECT id FROM animal WHERE name = 'Buddy'), (SELECT id FROM vet WHERE last_name = 'Smith'), '2024-01-12', 'General', 2.1, 'Healthy adult rabbit, all vitals normal. Vaccinations up to date.', 'Excellent'),
-- ((SELECT id FROM animal WHERE name = 'Whiskers'), (SELECT id FROM vet WHERE last_name = 'Davis'), '2024-02-07', 'Pre-adoption', 1.8, 'Healthy rabbit, minor dental check recommended.', 'Good'),
-- ((SELECT id FROM animal WHERE name = 'Charlie'), (SELECT id FROM vet WHERE last_name = 'Smith'), '2024-01-22', 'General', 4.5, 'Large rabbit, recommend neutering before adoption.', 'Good');

-- -- Insert sample animal notes (now referencing user_id instead of volunteer_id)
-- INSERT INTO animal_note (animal_id, user_id, note_date, note_content, note_type) VALUES
-- ((SELECT id FROM animal WHERE name = 'Buddy'), '11111111-1111-1111-1111-111111111111', '2024-01-15', 'Very social with other rabbits during play time. Responds well to gentle handling.', 'Behavioral'),
-- ((SELECT id FROM animal WHERE name = 'Whiskers'), '22222222-2222-2222-2222-222222222222', '2024-02-10', 'Prefers quiet spaces. Has been eating well and using litter box consistently.', 'General'),
-- ((SELECT id FROM animal WHERE name = 'Charlie'), '33333333-3333-3333-3333-333333333333', '2024-01-25', 'Large rabbit needs spacious enclosure. Very gentle despite size.', 'Behavioral');

-- -- Insert sample RFID logs (now referencing user_id instead of volunteer_id)
-- INSERT INTO rfid_log (rfid_tag, user_id, scan_type, location, notes) VALUES
-- ('RFID001', '11111111-1111-1111-1111-111111111111', 'check_in', 'Main Entrance', 'Started morning shift'),
-- ('RFID002', '22222222-2222-2222-2222-222222222222', 'check_in', 'Main Entrance', 'Started afternoon shift'),
-- ('RFID_A001', NULL, 'animal_interaction', 'Exercise Area', 'Buddy taken for exercise'),
-- ('RFID001', '11111111-1111-1111-1111-111111111111', 'check_out', 'Main Entrance', 'Completed morning shift');

-- -- Create indexes for better performance
-- CREATE INDEX idx_shift_user_date ON shift(user_id, shift_date);
-- CREATE INDEX idx_animal_note_animal ON animal_note(animal_id);
-- CREATE INDEX idx_animal_note_user ON animal_note(user_id);
-- CREATE INDEX idx_rfid_log_tag ON rfid_log(rfid_tag);
-- CREATE INDEX idx_rfid_log_time ON rfid_log(scan_time);
-- CREATE INDEX idx_health_check_animal ON health_check(animal_id);
-- CREATE INDEX idx_adoption_animal ON adoption(animal_id);
-- CREATE INDEX idx_user_volunteer ON "user"(is_volunteer);
-- CREATE INDEX idx_user_rfid ON "user"(rfid_tag);

-- Create views for easier querying
CREATE VIEW active_volunteers AS
SELECT 
    id,
    first_name,
    last_name,
    phone,
    rfid_tag,
    volunteer_start_date,
    volunteer_notes
FROM "user" 
WHERE is_active_volunteer = TRUE;

CREATE VIEW volunteer_shifts_summary AS
SELECT 
    u.id as user_id,
    u.first_name,
    u.last_name,
    COUNT(s.shift_id) as total_shifts,
    COUNT(CASE WHEN s.status = 'Completed' THEN 1 END) as completed_shifts,
    COUNT(CASE WHEN s.status = 'No Show' THEN 1 END) as no_shows,
    MAX(s.shift_date) as last_shift_date
FROM "user" u
LEFT JOIN shift s ON u.id = s.user_id
WHERE u.is_active_volunteer = TRUE
GROUP BY u.id, u.first_name, u.last_name; 