import api from './api';

const DEMO_PATIENTS = [
  {
    id: 1,
    userId: 5,
    firstName: 'Johnathan',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1-555-0201',
    dateOfBirth: '1988-04-12',
    gender: 'Male',
    bloodGroup: 'O+',
    address: '742 Evergreen Terrace, Springfield',
    emergencyContactName: 'Martha Doe',
    emergencyContactPhone: '+1-555-0209',
    allergies: 'Penicillin',
    medicalHistory: 'Mild hypertension diagnosed in 2021'
  },
  {
    id: 2,
    userId: 6,
    firstName: 'Emily',
    lastName: 'Watson',
    email: 'emily.watson@example.com',
    phone: '+1-555-0202',
    dateOfBirth: '1993-09-25',
    gender: 'Female',
    bloodGroup: 'A+',
    address: '128 Pinecrest Way, Seattle, WA',
    emergencyContactName: 'Thomas Watson',
    emergencyContactPhone: '+1-555-0210',
    allergies: 'Aspirin, Shellfish',
    medicalHistory: 'Asthma since childhood'
  },
  {
    id: 3,
    userId: null,
    firstName: 'Michael',
    lastName: 'Chang',
    email: 'michael.chang@example.com',
    phone: '+1-555-0203',
    dateOfBirth: '1975-11-03',
    gender: 'Male',
    bloodGroup: 'B-',
    address: '450 Silicon Blvd, San Jose, CA',
    emergencyContactName: 'Linda Chang',
    emergencyContactPhone: '+1-555-0211',
    allergies: 'None known',
    medicalHistory: 'Type 2 Diabetes, controlled via diet and metformin'
  },
  {
    id: 4,
    userId: null,
    firstName: 'Sophia',
    lastName: 'Martinez',
    email: 'sophia.m@example.com',
    phone: '+1-555-0204',
    dateOfBirth: '2001-02-18',
    gender: 'Female',
    bloodGroup: 'AB+',
    address: '89 Sunset Strip, Los Angeles, CA',
    emergencyContactName: 'Carlos Martinez',
    emergencyContactPhone: '+1-555-0212',
    allergies: 'Sulfa drugs',
    medicalHistory: 'Annual preventative health checkups'
  }
];

export const patientService = {
  async getAll(search = '') {
    try {
      const response = await api.get('/patients', {
        params: search ? { search } : {}
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        if (!search) return DEMO_PATIENTS;
        const s = search.toLowerCase();
        return DEMO_PATIENTS.filter(p =>
          p.firstName.toLowerCase().includes(s) ||
          p.lastName.toLowerCase().includes(s) ||
          p.phone.includes(s)
        );
      }
      throw error;
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/patients/${id}`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        const found = DEMO_PATIENTS.find(p => p.id === Number(id));
        if (found) return found;
      }
      throw error;
    }
  },

  async create(patientData) {
    try {
      const response = await api.post('/patients', patientData);
      return response.data;
    } catch (error) {
      if (!error.response) {
        const newPatient = { ...patientData, id: Date.now() };
        DEMO_PATIENTS.push(newPatient);
        return newPatient;
      }
      throw error;
    }
  },

  async update(id, patientData) {
    try {
      const response = await api.put(`/patients/${id}`, patientData);
      return response.data;
    } catch (error) {
      if (!error.response) {
        const idx = DEMO_PATIENTS.findIndex(p => p.id === Number(id));
        if (idx !== -1) {
          DEMO_PATIENTS[idx] = { ...DEMO_PATIENTS[idx], ...patientData, id: Number(id) };
          return DEMO_PATIENTS[idx];
        }
      }
      throw error;
    }
  },

  async delete(id) {
    try {
      await api.delete(`/patients/${id}`);
    } catch (error) {
      if (!error.response) {
        const idx = DEMO_PATIENTS.findIndex(p => p.id === Number(id));
        if (idx !== -1) DEMO_PATIENTS.splice(idx, 1);
        return;
      }
      throw error;
    }
  }
};

export default patientService;
