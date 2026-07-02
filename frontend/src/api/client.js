const API_BASE_URL = 'http://127.0.0.1:8000/api';

async function request(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API error ${response.status}: ${endpoint}`);
  }
  return response.json();
}

export const api = {
  getProfile: () => request('/profile/'),
  getSkills: () => request('/skills/'),
  getExperience: () => request('/experience/'),
  getProjects: () => request('/projects/'),
  getCertifications: () => request('/certifications/'),
  submitContact: async (data) => {
    const response = await fetch(`${API_BASE_URL}/contact/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to send message');
    }
    return response.json();
  },
};