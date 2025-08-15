const API_BASE = 'http://localhost:8080/api';

const request = async (endpoint: string, options: RequestInit = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Request failed');
  }
  
  return response.json();
};

export const api = {
  // Auth
  register: (data: { username: string; email: string; password: string }) =>
    request('/users/register', { method: 'POST', body: JSON.stringify(data) }),
    
  login: (data: { email: string; password: string }) =>
    request('/users/login', { method: 'POST', body: JSON.stringify(data) }),

  // Feedback
  getFeedback: () => request('/feedback'),
  
  getFeedbackById: (id: string) => request(`/feedback/${id}`),
  
  createFeedback: (data: { title: string; description: string; category: string }) => {
    const token = localStorage.getItem('token');
    return request('/feedback', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
  },

  updateFeedback: (id: string, data: { title: string; description: string; category: string }) => {
    const token = localStorage.getItem('token');
    return request(`/feedback/${id}`, {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
  },

  deleteFeedback: (id: string) => {
    const token = localStorage.getItem('token');
    return request(`/feedback/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
  },

  // Votes
  vote: (feedbackId: string, voteType: string) => {
    const token = localStorage.getItem('token');
    return request(`/votes/${feedbackId}`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ voteType }),
    });
  },
};
