import api from './api';

const DEMO_APPOINTMENTS = [
  {
    id: 1,
    patientId: 1,
    patientName: 'Johnathan Doe',
    patientPhone: '+1-555-0201',
    doctorId: 1,
    doctorName: 'Dr. Sarah Jenkins',
    doctorSpecialization: 'Cardiologist',
    appointmentDate: '2026-10-10',
    appointmentTime: '09:30 AM',
    status: 'CONFIRMED',
    reasonForVisit: 'Annual Cardiovascular Checkup',
    notes: 'Patient reported occasional palpitations during exercise.'
  },
  {
    id: 2,
    patientId: 2,
    patientName: 'Emily Watson',
    patientPhone: '+1-555-0202',
    doctorId: 3,
    doctorName: 'Dr. Elena Rostova',
    doctorSpecialization: 'General Physician',
    appointmentDate: '2026-10-11',
    appointmentTime: '10:15 AM',
    status: 'CONFIRMED',
    reasonForVisit: 'Seasonal Asthma Exacerbation',
    notes: 'Patient requires inhaler renewal and spirometry test.'
  },
  {
    id: 3,
    patientId: 3,
    patientName: 'Michael Chang',
    patientPhone: '+1-555-0203',
    doctorId: 2,
    doctorName: 'Dr. Robert Chen',
    doctorSpecialization: 'Neurologist',
    appointmentDate: '2026-10-12',
    appointmentTime: '02:00 PM',
    status: 'PENDING',
    reasonForVisit: 'Chronic Migraines Consultation',
    notes: 'Frequent headaches with visual aura in evenings.'
  },
  {
    id: 4,
    patientId: 4,
    patientName: 'Sophia Martinez',
    patientPhone: '+1-555-0204',
    doctorId: 3,
    doctorName: 'Dr. Elena Rostova',
    doctorSpecialization: 'General Physician',
    appointmentDate: '2026-10-05',
    appointmentTime: '11:00 AM',
    status: 'COMPLETED',
    reasonForVisit: 'Routine Blood Work & Physical',
    notes: 'Vitals normal, cholesterol panel ordered.'
  }
];

export const appointmentService = {
  async getAll() {
    try {
      const response = await api.get('/appointments');
      return response.data;
    } catch (error) {
      if (!error.response) return DEMO_APPOINTMENTS;
      throw error;
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/appointments/${id}`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        const found = DEMO_APPOINTMENTS.find(a => a.id === Number(id));
        if (found) return found;
      }
      throw error;
    }
  },

  async getByPatient(patientId) {
    try {
      const response = await api.get(`/appointments/patient/${patientId}`);
      return response.data;
    } catch (error) {
      if (!error.response) return DEMO_APPOINTMENTS.filter(a => a.patientId === Number(patientId));
      throw error;
    }
  },

  async getByDoctor(doctorId) {
    try {
      const response = await api.get(`/appointments/doctor/${doctorId}`);
      return response.data;
    } catch (error) {
      if (!error.response) return DEMO_APPOINTMENTS.filter(a => a.doctorId === Number(doctorId));
      throw error;
    }
  },

  async create(appointmentData) {
    try {
      const response = await api.post('/appointments', appointmentData);
      return response.data;
    } catch (error) {
      if (!error.response) {
        const newAppt = { ...appointmentData, id: Date.now(), status: 'PENDING' };
        DEMO_APPOINTMENTS.push(newAppt);
        return newAppt;
      }
      throw error;
    }
  },

  async updateStatus(id, status) {
    try {
      const response = await api.patch(`/appointments/${id}/status`, { status });
      return response.data;
    } catch (error) {
      if (!error.response) {
        const item = DEMO_APPOINTMENTS.find(a => a.id === Number(id));
        if (item) item.status = status;
        return item;
      }
      throw error;
    }
  },

  async delete(id) {
    try {
      await api.delete(`/appointments/${id}`);
    } catch (error) {
      if (!error.response) {
        const idx = DEMO_APPOINTMENTS.findIndex(a => a.id === Number(id));
        if (idx !== -1) DEMO_APPOINTMENTS.splice(idx, 1);
        return;
      }
      throw error;
    }
  }
};

export default appointmentService;
