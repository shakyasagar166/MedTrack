import api from './api';

const DEMO_PRESCRIPTIONS = [
  {
    id: 1,
    medicalRecordId: 2,
    patientId: 1,
    patientName: 'Johnathan Doe',
    doctorId: 1,
    doctorName: 'Dr. Sarah Jenkins',
    issueDate: '2026-09-15',
    medications: 'Lisinopril 10mg Tablets',
    dosageInstructions: 'Take 1 tablet daily every morning with water.',
    duration: '30 Days',
    status: 'ACTIVE'
  },
  {
    id: 2,
    medicalRecordId: null,
    patientId: 2,
    patientName: 'Emily Watson',
    doctorId: 3,
    doctorName: 'Dr. Elena Rostova',
    issueDate: '2026-09-20',
    medications: 'Albuterol Sulfate Inhaler (90mcg/actuation)',
    dosageInstructions: '1-2 puffs every 4 to 6 hours as needed for shortness of breath.',
    duration: 'As needed',
    status: 'ACTIVE'
  },
  {
    id: 3,
    medicalRecordId: null,
    patientId: 3,
    patientName: 'Michael Chang',
    doctorId: 2,
    doctorName: 'Dr. Robert Chen',
    issueDate: '2026-09-28',
    medications: 'Metformin 500mg ER',
    dosageInstructions: 'Take 1 tablet twice daily with meals.',
    duration: '90 Days',
    status: 'ACTIVE'
  }
];

export const prescriptionService = {
  async getAll() {
    try {
      const response = await api.get('/prescriptions');
      return response.data;
    } catch (error) {
      if (!error.response) return DEMO_PRESCRIPTIONS;
      throw error;
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/prescriptions/${id}`);
      return response.data;
    } catch (error) {
      if (!error.response) return DEMO_PRESCRIPTIONS.find(p => p.id === Number(id));
      throw error;
    }
  },

  async getByPatient(patientId) {
    try {
      const response = await api.get(`/prescriptions/patient/${patientId}`);
      return response.data;
    } catch (error) {
      if (!error.response) return DEMO_PRESCRIPTIONS.filter(p => p.patientId === Number(patientId));
      throw error;
    }
  },

  async create(prescriptionData) {
    try {
      const response = await api.post('/prescriptions', prescriptionData);
      return response.data;
    } catch (error) {
      if (!error.response) {
        const newRx = { ...prescriptionData, id: Date.now(), status: 'ACTIVE' };
        DEMO_PRESCRIPTIONS.push(newRx);
        return newRx;
      }
      throw error;
    }
  },

  async updateStatus(id, status) {
    try {
      const response = await api.patch(`/prescriptions/${id}/status`, { status });
      return response.data;
    } catch (error) {
      if (!error.response) {
        const item = DEMO_PRESCRIPTIONS.find(p => p.id === Number(id));
        if (item) item.status = status;
        return item;
      }
      throw error;
    }
  },

  async delete(id) {
    try {
      await api.delete(`/prescriptions/${id}`);
    } catch (error) {
      if (!error.response) {
        const idx = DEMO_PRESCRIPTIONS.findIndex(p => p.id === Number(id));
        if (idx !== -1) DEMO_PRESCRIPTIONS.splice(idx, 1);
        return;
      }
      throw error;
    }
  }
};

export default prescriptionService;
