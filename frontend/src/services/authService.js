import api from './api';

export const authService = {
  async login(username, password) {
    try {
      const response = await api.post('/auth/login', { username, password });
      const { token, ...userData } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      return response.data;
    } catch (error) {
      // Offline / fallback demo login for instant preview
      if (!error.response && (username === 'admin' || username === 'dr.sarah' || username === 'john.doe')) {
        const demoUser = {
          token: 'demo-jwt-token-preview',
          id: username === 'admin' ? 1 : username === 'dr.sarah' ? 2 : 5,
          username,
          email: `${username}@medtrack.com`,
          role: username === 'admin' ? 'ROLE_ADMIN' : username === 'dr.sarah' ? 'ROLE_DOCTOR' : 'ROLE_PATIENT',
          fullName: username === 'admin' ? 'System Administrator' : username === 'dr.sarah' ? 'Dr. Sarah Jenkins' : 'Johnathan Doe'
        };
        localStorage.setItem('token', demoUser.token);
        localStorage.setItem('user', JSON.stringify(demoUser));
        return demoUser;
      }
      throw error;
    }
  },

  async register(userData) {
    const response = await api.post('/auth/register', userData);
    const { token, ...user } = response.data;
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
    return response.data;
  },

  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      const stored = this.getStoredUser();
      if (stored) return stored;
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getStoredUser() {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  },

  getStoredToken() {
    return localStorage.getItem('token');
  }
};

export default authService;
