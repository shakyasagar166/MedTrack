export const API_BASE_URL = '/api';

export const USER_ROLES = {
  ADMIN: 'ROLE_ADMIN',
  DOCTOR: 'ROLE_DOCTOR',
  PATIENT: 'ROLE_PATIENT',
  STAFF: 'ROLE_STAFF'
};

export const APPOINTMENT_STATUS = {
  PENDING: { label: 'Pending', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  CONFIRMED: { label: 'Confirmed', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  COMPLETED: { label: 'Completed', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  CANCELLED: { label: 'Cancelled', color: 'bg-rose-100 text-rose-800 border-rose-200' }
};

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const DEPARTMENTS = [
  'Cardiology',
  'Neurology',
  'Internal Medicine',
  'Pediatrics',
  'Orthopedics',
  'Dermatology',
  'Oncology',
  'General Surgery'
];
