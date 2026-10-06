-- MedTrack Sample Seed Data

-- Users (Default password: password123, BCrypt encoded: $2a$10$wK1kC8u3rK4h3F1u2Qo6..z7x8w9y0z1a2b3c4d5e6f7g8h9i0j1k)
-- In Spring Boot, password will also be automatically verified/seeded if needed
INSERT INTO users (id, username, email, password, role, full_name, phone, created_at, updated_at) VALUES
(1, 'admin', 'admin@medtrack.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'ROLE_ADMIN', 'System Administrator', '+1-555-0100', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'dr.sarah', 'sarah.jenkins@medtrack.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'ROLE_DOCTOR', 'Dr. Sarah Jenkins', '+1-555-0101', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'dr.robert', 'robert.chen@medtrack.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'ROLE_DOCTOR', 'Dr. Robert Chen', '+1-555-0102', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'dr.elena', 'elena.rostova@medtrack.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'ROLE_DOCTOR', 'Dr. Elena Rostova', '+1-555-0103', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'john.doe', 'john.doe@example.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'ROLE_PATIENT', 'Johnathan Doe', '+1-555-0201', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'emily.watson', 'emily.watson@example.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'ROLE_PATIENT', 'Emily Watson', '+1-555-0202', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Doctors
INSERT INTO doctors (id, user_id, full_name, email, phone, specialization, license_number, qualification, experience_years, consultation_fee, department, available_days, available_time, created_at) VALUES
(1, 2, 'Dr. Sarah Jenkins', 'sarah.jenkins@medtrack.com', '+1-555-0101', 'Cardiologist', 'MD-CARD-8849', 'MD, FACC - Harvard Medical School', 12, 180.00, 'Cardiology', 'Mon, Wed, Fri', '09:00 AM - 04:00 PM', CURRENT_TIMESTAMP),
(2, 3, 'Dr. Robert Chen', 'robert.chen@medtrack.com', '+1-555-0102', 'Neurologist', 'MD-NEUR-4921', 'MD, PhD - Johns Hopkins', 15, 220.00, 'Neurology', 'Tue, Thu, Sat', '10:00 AM - 05:00 PM', CURRENT_TIMESTAMP),
(3, 4, 'Dr. Elena Rostova', 'elena.rostova@medtrack.com', '+1-555-0103', 'General Physician', 'MD-GP-3019', 'MBBS, MD - Oxford University', 8, 100.00, 'Internal Medicine', 'Mon - Fri', '08:30 AM - 03:30 PM', CURRENT_TIMESTAMP);

-- Patients
INSERT INTO patients (id, user_id, first_name, last_name, email, phone, date_of_birth, gender, blood_group, address, emergency_contact_name, emergency_contact_phone, allergies, medical_history, created_at, updated_at) VALUES
(1, 5, 'Johnathan', 'Doe', 'john.doe@example.com', '+1-555-0201', '1988-04-12', 'Male', 'O+', '742 Evergreen Terrace, Springfield', 'Martha Doe', '+1-555-0209', 'Penicillin', 'Mild hypertension diagnosed in 2021', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 6, 'Emily', 'Watson', 'emily.watson@example.com', '+1-555-0202', '1993-09-25', 'Female', 'A+', '128 Pinecrest Way, Seattle, WA', 'Thomas Watson', '+1-555-0210', 'Aspirin, Shellfish', 'Asthma since childhood', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, NULL, 'Michael', 'Chang', 'michael.chang@example.com', '+1-555-0203', '1975-11-03', 'Male', 'B-', '450 Silicon Blvd, San Jose, CA', 'Linda Chang', '+1-555-0211', 'None known', 'Type 2 Diabetes, controlled via diet and metformin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, NULL, 'Sophia', 'Martinez', 'sophia.m@example.com', '+1-555-0204', '2001-02-18', 'Female', 'AB+', '89 Sunset Strip, Los Angeles, CA', 'Carlos Martinez', '+1-555-0212', 'Sulfa drugs', 'Annual preventative health checkups', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Appointments
INSERT INTO appointments (id, patient_id, doctor_id, appointment_date, appointment_time, status, reason_for_visit, notes, created_at, updated_at) VALUES
(1, 1, 1, '2026-10-10', '09:30 AM', 'CONFIRMED', 'Annual Cardiovascular Checkup', 'Patient reported occasional palpitations during exercise.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 3, '2026-10-11', '10:15 AM', 'CONFIRMED', 'Seasonal Asthma Exacerbation', 'Patient requires inhaler renewal and spirometry test.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 3, 2, '2026-10-12', '02:00 PM', 'PENDING', 'Chronic Migraines Consultation', 'Frequent headaches with visual aura in evenings.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 4, 3, '2026-10-05', '11:00 AM', 'COMPLETED', 'Routine Blood Work & Physical', 'Vitals normal, cholesterol panel ordered.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Medical Records
INSERT INTO medical_records (id, patient_id, doctor_id, appointment_id, record_date, diagnosis, symptoms, treatment_plan, lab_results, notes, created_at) VALUES
(1, 4, 3, 4, '2026-10-05', 'Routine Wellness Check - Normal', 'None', 'Continue balanced diet, 30 min daily cardio.', 'BP: 118/76 mmHg, Pulse: 72 bpm, Fasting Glucose: 89 mg/dL', 'Healthy 25-year-old female in great physical condition.', CURRENT_TIMESTAMP),
(2, 1, 1, NULL, '2026-09-15', 'Mild Essential Hypertension', 'Occasional tension headaches, elevated resting BP', 'Prescribed Lisinopril 10mg daily. Low sodium dietary changes.', 'BP: 142/90 mmHg, ECG: Normal sinus rhythm', 'Scheduled 4-week follow-up appointment.', CURRENT_TIMESTAMP);

-- Prescriptions
INSERT INTO prescriptions (id, medical_record_id, patient_id, doctor_id, issue_date, medications, dosage_instructions, duration, status, created_at) VALUES
(1, 2, 1, 1, '2026-09-15', 'Lisinopril 10mg Tablets', 'Take 1 tablet daily every morning with water.', '30 Days', 'ACTIVE', CURRENT_TIMESTAMP),
(2, NULL, 2, 3, '2026-09-20', 'Albuterol Sulfate Inhaler (90mcg/actuation)', '1-2 puffs every 4 to 6 hours as needed for shortness of breath.', 'As needed', 'ACTIVE', CURRENT_TIMESTAMP),
(3, NULL, 3, 2, '2026-09-28', 'Metformin 500mg ER', 'Take 1 tablet twice daily with meals.', '90 Days', 'ACTIVE', CURRENT_TIMESTAMP);
