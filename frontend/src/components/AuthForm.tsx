import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export const AuthForm = ({ setUser, showMessage, register = false }: { 
  setUser: (user: { username: string; email: string }) => void; 
  showMessage: (msg: string, type: string) => void; 
  register?: boolean; 
}) => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (register) {
        await api.register(form);
        const userData = { username: form.username, email: form.email };
        localStorage.setItem('token', 'token');
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        showMessage('Registration successful!', 'success');
      } else {
        await api.login({ email: form.email, password: form.password });
        const userData = { username: form.email.split('@')[0], email: form.email };
        localStorage.setItem('token', 'token');
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        showMessage('Login successful!', 'success');
      }
      navigate('/');
    } catch (error: any) {
      showMessage(error.message || 'Failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-900 border border-gray-700 p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          {register ? 'Register' : 'Login'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          {register && (
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Username</label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                placeholder="Enter username"
                required
              />
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
              placeholder="Enter email"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
              placeholder="Enter password"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? (register ? 'Creating...' : 'Logging in...') : (register ? 'Register' : 'Login')}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-gray-300">
            {register ? 'Already have an account?' : "Don't have an account?"}{' '}
            <Link to={register ? '/login' : '/register'} className="text-blue-400">
              {register ? 'Login here' : 'Register here'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
