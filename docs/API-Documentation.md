# MedTrack RESTful API Documentation

Welcome to the MedTrack API specification. The MedTrack backend provides a secure, role-based REST API designed for clinical patient management, appointment scheduling, electronic medical records (EMR), and prescription tracking.

---

## 1. Base URL & Authentication

- **Base URL**: `http://localhost:8080/api`
- **Authentication**: Bearer Token (JWT - JSON Web Token)
- Include in HTTP headers:
  ```http
  Authorization: Bearer <your-jwt-token>
  ```

---

## 2. Authentication & Authorization (`/api/auth`)

### 2.1 User Login
- **Endpoint**: `POST /api/auth/login`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "username": "admin",
    "password": "password123"
  }
  ```
- **Success Response (200 OK)**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "type": "Bearer",
    "id": 1,
    "username": "admin",
    "email": "admin@medtrack.com",
    "role": "ROLE_ADMIN",
    "fullName": "System Administrator"
  }
  ```

### 2.2 User Registration
- **Endpoint**: `POST /api/auth/register`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "username": "newpatient",
    "email": "newpatient@example.com",
    "password": "password123",
    "fullName": "Alice Johnson",
    "phone": "+1-555-0301",
    "role": "ROLE_PATIENT"
  }
  ```
- **Success Response (201 Created)**:
  ```json
  {
    "message": "User registered successfully",
    "userId": 7
  }
  ```

---

## 3. Patient Management (`/api/patients`)

### 3.1 List All Patients
- **Endpoint**: `GET /api/patients`
- **Access**: `ROLE_ADMIN`, `ROLE_DOCTOR`
- **Optional Query Params**: `?search=john`
- **Response (200 OK)**:
  ```json
  [
    {
      "id": 1,
      "firstName": "Johnathan",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "phone": "+1-555-0201",
      "dateOfBirth": "1988-04-12",
      "gender": "Male",
      "bloodGroup": "O+",
      "address": "742 Evergreen Terrace, Springfield",
      "emergencyContactName": "Martha Doe",
      "emergencyContactPhone": "+1-555-0209",
      "allergies": "Penicillin",
      "medicalHistory": "Mild hypertension"
    }
  ]
  ```

### 3.2 Get Patient By ID
- **Endpoint**: `GET /api/patients/{id}`
- **Access**: `ROLE_ADMIN`, `ROLE_DOCTOR`, `ROLE_PATIENT` (Self)

### 3.3 Create New Patient
- **Endpoint**: `POST /api/patients`
- **Access**: `ROLE_ADMIN`, `ROLE_DOCTOR`
- **Request Body**:
  ```json
  {
    "firstName": "Clara",
    "lastName": "Oswald",
    "email": "clara@example.com",
    "phone": "+1-555-0789",
    "dateOfBirth": "1994-11-23",
    "gender": "Female",
    "bloodGroup": "B+",
    "address": "221B Baker St",
    "allergies": "None",
    "medicalHistory": "None"
  }
  ```

### 3.4 Update Patient
- **Endpoint**: `PUT /api/patients/{id}`
- **Access**: `ROLE_ADMIN`, `ROLE_DOCTOR`

### 3.5 Delete Patient
- **Endpoint**: `DELETE /api/patients/{id}`
- **Access**: `ROLE_ADMIN`

---

## 4. Doctor Management (`/api/doctors`)

### 4.1 Get All Doctors
- **Endpoint**: `GET /api/doctors`
- **Access**: Authenticated users
- **Response (200 OK)**:
  ```json
  [
    {
      "id": 1,
      "fullName": "Dr. Sarah Jenkins",
      "email": "sarah.jenkins@medtrack.com",
      "phone": "+1-555-0101",
      "specialization": "Cardiologist",
      "licenseNumber": "MD-CARD-8849",
      "qualification": "MD, FACC - Harvard Medical School",
      "experienceYears": 12,
      "consultationFee": 180.00,
      "department": "Cardiology",
      "availableDays": "Mon, Wed, Fri",
      "availableTime": "09:00 AM - 04:00 PM"
    }
  ]
  ```

### 4.2 Get Doctor By ID
- **Endpoint**: `GET /api/doctors/{id}`

### 4.3 Add Doctor
- **Endpoint**: `POST /api/doctors`
- **Access**: `ROLE_ADMIN`

---

## 5. Appointment Management (`/api/appointments`)

### 5.1 Get All Appointments
- **Endpoint**: `GET /api/appointments`
- **Access**: `ROLE_ADMIN`, `ROLE_DOCTOR`, `ROLE_PATIENT` (filtered by role)

### 5.2 Create Appointment
- **Endpoint**: `POST /api/appointments`
- **Request Body**:
  ```json
  {
    "patientId": 1,
    "doctorId": 1,
    "appointmentDate": "2026-10-15",
    "appointmentTime": "10:00 AM",
    "reasonForVisit": "Heart rate monitoring follow-up",
    "notes": "Patient requested morning slot"
  }
  ```

### 5.3 Update Appointment Status
- **Endpoint**: `PATCH /api/appointments/{id}/status`
- **Request Body**:
  ```json
  {
    "status": "CONFIRMED"
  }
  ```
  *(Options: `PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED`)*

---

## 6. Electronic Medical Records (`/api/medical-records`)

### 6.1 Get Records by Patient
- **Endpoint**: `GET /api/medical-records/patient/{patientId}`
- **Access**: `ROLE_ADMIN`, `ROLE_DOCTOR`, `ROLE_PATIENT`

### 6.2 Create Medical Record
- **Endpoint**: `POST /api/medical-records`
- **Access**: `ROLE_ADMIN`, `ROLE_DOCTOR`
- **Request Body**:
  ```json
  {
    "patientId": 1,
    "doctorId": 1,
    "appointmentId": 1,
    "recordDate": "2026-10-10",
    "diagnosis": "Sinus Tachycardia",
    "symptoms": "Resting pulse > 100bpm, shortness of breath",
    "treatmentPlan": "Prescribe beta blockers and continuous 24h Holter monitor",
    "labResults": "Troponin normal, ECG shows sinus tachycardia",
    "notes": "Follow up after 14 days"
  }
  ```

---

## 7. Prescriptions (`/api/prescriptions`)

### 7.1 Get Prescriptions
- **Endpoint**: `GET /api/prescriptions`
- **Endpoint**: `GET /api/prescriptions/patient/{patientId}`

### 7.2 Create Prescription
- **Endpoint**: `POST /api/prescriptions`
- **Access**: `ROLE_DOCTOR`, `ROLE_ADMIN`
- **Request Body**:
  ```json
  {
    "medicalRecordId": 1,
    "patientId": 1,
    "doctorId": 1,
    "issueDate": "2026-10-10",
    "medications": "Metoprolol 25mg Tablet",
    "dosageInstructions": "1 tablet twice daily with food",
    "duration": "14 Days",
    "status": "ACTIVE"
  }
  ```

---

## 8. Admin Management (`/api/admin`)

- `GET /api/admin/stats` - Total patient count, doctor count, appointment counts by status, revenue estimate.
- `GET /api/admin/users` - Manage user accounts and roles.
- `DELETE /api/admin/users/{id}` - Remove user account.

---

## 9. Error Response Format

All API errors return a standard JSON structure:
```json
{
  "timestamp": "2026-10-06T13:20:00Z",
  "status": 404,
  "error": "Not Found",
  "message": "Patient with ID 99 was not found",
  "path": "/api/patients/99"
}
```
