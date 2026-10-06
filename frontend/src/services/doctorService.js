import api from './api';

const DEMO_DOCTORS = [
  {
    id: 1,
    userId: 2,
    fullName: 'Dr. Sarah Jenkins',
    email: 'sarah.jenkins@medtrack.com',
    phone: '+1-555-0101',
    specialization: 'Cardiologist',
    licenseNumber: 'MD-CARD-8849',
    qualification: 'MD, FACC - Harvard Medical School',
    experienceYears: 12,
    consultationFee: 180.00,
    department: 'Cardiology',
    availableDays: 'Mon, Wed, Fri',
    availableTime: '09:00 AM - 04:00 PM'
  },
  {
    id: 2,
    userId: 3,
    fullName: 'Dr. Robert Chen',
    email: 'robert.chen@medtrack.com',
    phone: '+1-555-0102',
    specialization: 'Neurologist',
    licenseNumber: 'MD-NEUR-4921',
    qualification: 'MD, PhD - Johns Hopkins',
    experienceYears: 15,
    consultationFee: 220.00,
    department: 'Neurology',
    availableDays: 'Tue, Thu, Sat',
    availableTime: '10:00 AM - 05:00 PM'
  },
  {
    id: 3,
    userId: 4,
    fullName: 'Dr. Elena Rostova',
    email: 'elena.rostova@medtrack.com',
    phone: '+1-555-0103',
    specialization: 'General Physician',
    licenseNumber: 'MD-GP-3019',
    qualification: 'MBBS, MD - Oxford University',
    experienceYears: 8,
    consultationFee: 100.00,
    department: 'Internal Medicine',
    availableDays: 'Mon - Fri',
    availableTime: '08:30 AM - 03:30 PM'
  }
];

export const doctorService = {
  async getAll() {
    try {
      const response = await api.get('/doctors');
      return response.data;
    } catch (error) {
      if (!error.response) return DEMO_DOCTORS;
      throw error;
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/doctors/${id}`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        const found = DEMO_DOCTORS.find(d => d.id === Number(id));
        if (found) return found;
      }
      throw error;
    }
  },

  async create(doctorData) {
    try {
      const response = await api.post('/doctors', doctorData);
      return response.data;
    } catch (error) {
      if (!error.response) {
        const newDoctor = { ...doctorData, id: Date.now() };
        DEMO_DOCTORS.push(newDoctor);
        return newDoctor;
      }
      throw error;
    }
  },

  async update(id, doctorData) {
    try {
      const response = await api.put(`/doctors/${id}`, doctorData);
      return response.data;
    } catch (error) {
      if (!error.response) {
        const idx = DEMO_DOCTORS.findIndex(d => d.id === Number(id));
        if (idx !== -1) {
          DEMO_DOCTORS[idx] = { ...DEMO_DOCTORS[idx], ...doctorData, id: Number(id) };
          return DEMO_DOCTORS[idx];
        }
      }
      throw error;
    }
  },

  async delete(id) {
    try {
      await api.delete(`/doctors/${id}`);
    } catch (error) {
      if (!error.response) {
        const idx = DEMO_DOCTORS.findIndex(d => d.id === Number(id));
        if (idx !== -1) DEMO_DOCTORS.splice(idx, 1);
        return;
      }
      throw error;
    }
  }
};

export default doctorService;
