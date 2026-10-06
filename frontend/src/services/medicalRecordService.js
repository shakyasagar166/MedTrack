import api from './api';

const DEMO_RECORDS = [
  {
    id: 1,
    patientId: 4,
    patientName: 'Sophia Martinez',
    doctorId: 3,
    doctorName: 'Dr. Elena Rostova',
    appointmentId: 4,
    recordDate: '2026-10-05',
    diagnosis: 'Routine Wellness Check - Normal',
    symptoms: 'None',
    treatmentPlan: 'Continue balanced diet, 30 min daily cardio.',
    labResults: 'BP: 118/76 mmHg, Pulse: 72 bpm, Fasting Glucose: 89 mg/dL',
    notes: 'Healthy 25-year-old female in great physical condition.'
  },
  {
    id: 2,
    patientId: 1,
    patientName: 'Johnathan Doe',
    doctorId: 1,
    doctorName: 'Dr. Sarah Jenkins',
    appointmentId: null,
    recordDate: '2026-09-15',
    diagnosis: 'Mild Essential Hypertension',
    symptoms: 'Occasional tension headaches, elevated resting BP',
    treatmentPlan: 'Prescribed Lisinopril 10mg daily. Low sodium dietary changes.',
    labResults: 'BP: 142/90 mmHg, ECG: Normal sinus rhythm',
    notes: 'Scheduled 4-week follow-up appointment.'
  }
];

export const medicalRecordService = {
  async getAll() {
    try {
      const response = await api.get('/medical-records');
      return response.data;
    } catch (error) {
      if (!error.response) return DEMO_RECORDS;
      throw error;
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/medical-records/${id}`);
      return response.data;
    } catch (error) {
      if (!error.response) return DEMO_RECORDS.find(r => r.id === Number(id));
      throw error;
    }
  },

  async getByPatient(patientId) {
    try {
      const response = await api.get(`/medical-records/patient/${patientId}`);
      return response.data;
    } catch (error) {
      if (!error.response) return DEMO_RECORDS.filter(r => r.patientId === Number(patientId));
      throw error;
    }
  },

  async create(recordData) {
    try {
      const response = await api.post('/medical-records', recordData);
      return response.data;
    } catch (error) {
      if (!error.response) {
        const newRecord = { ...recordData, id: Date.now() };
        DEMO_RECORDS.push(newRecord);
        return newRecord;
      }
      throw error;
    }
  },

  async delete(id) {
    try {
      await api.delete(`/medical-records/${id}`);
    } catch (error) {
      if (!error.response) {
        const idx = DEMO_RECORDS.findIndex(r => r.id === Number(id));
        if (idx !== -1) DEMO_RECORDS.splice(idx, 1);
        return;
      }
      throw error;
    }
  }
};

export default medicalRecordService;
