import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../services/api';

export const FeedbackForm = ({ user, showMessage, edit = false }: { 
  user: { username: string; email: string }; 
  showMessage: (msg: string, type: string) => void; 
  edit?: boolean; 
}) => {
  const { id } = useParams();
  const [form, setForm] = useState({ title: '', description: '', category: 'feature' });
  const [loading, setLoading] = useState(edit);
  const navigate = useNavigate();

  useEffect(() => {
    if (edit && id) loadFeedback();
  }, [edit, id]);

  const loadFeedback = async () => {
    try {
      const response = await api.getFeedbackById(id!);
      const feedback = response.feedback;
      if (feedback?.author.username === user.username) {
        setForm({ title: feedback.title, description: feedback.description, category: feedback.category });
      } else {
        showMessage('Not authorized to edit this feedback', 'error');
        navigate('/');
      }
    } catch (error) {
      showMessage('Failed to load feedback', 'error');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.title.length < 5 || form.description.length < 20) {
      showMessage('Title (5 chars) and description (20 chars) required', 'error');
      return;
    }

    setLoading(true);
    try {
      if (edit) {
        await api.updateFeedback(id!, form);
        showMessage('Feedback updated!', 'success');
      } else {
        await api.createFeedback(form);
        showMessage('Feedback created!', 'success');
      }
      navigate('/');
    } catch (error: any) {
      showMessage(error.message || 'Failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-16 text-white">Loading...</div>;

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          {edit ? 'Edit Feedback' : 'Create Feedback'}
        </h1>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-700 rounded-2xl p-8">
        <div className="mb-6">
          <label className="block text-white mb-3">Title (min 5 characters)</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
            placeholder="Enter title"
            required
          />
          <div className="text-sm text-gray-400 mt-2">{form.title.length}/5 characters</div>
        </div>
        
        <div className="mb-6">
          <label className="block text-white mb-3">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
            required
          >
            <option value="feature">Feature Request</option>
            <option value="bug">Bug Report</option>
            <option value="improvement">Improvement</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="mb-8">
          <label className="block text-white mb-3">Description (min 20 characters)</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={6}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
            placeholder="Describe your feedback..."
            required
          />
          <div className="text-sm text-gray-400 mt-2">{form.description.length}/20 characters</div>
        </div>
        
        <div className="space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? (edit ? 'Updating...' : 'Creating...') : (edit ? 'Update Feedback' : 'Create Feedback')}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-700 text-gray-200 py-3 px-8 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
