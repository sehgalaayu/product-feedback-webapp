import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

// Simple interfaces for beginners
interface User {
  username: string;
  email: string;
}

interface Feedback {
  _id: string;
  title: string;
  description: string;
  category: string;
  author: { username: string };
  votes: Array<{ voteType: string; user: string }>;
  createdAt: string;
}

export const Home = ({ user, showMessage }: { user: User | null; showMessage: (msg: string, type: string) => void }) => {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  // Load feedback on component mount
  useEffect(() => {
    loadFeedback();
  }, []);

  // Simple function to load feedback
  const loadFeedback = async () => {
    try {
      const response = await api.getFeedback();
      setFeedback(response.feedback || []);
    } catch (error) {
      console.error('Error loading feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle voting with intermediate state
  const handleVote = async (feedbackId: string, voteType: string) => {
    if (!user) {
      showMessage('Please login to vote', 'info');
      return;
    }

    try {
      // Show intermediate state (remove current vote first)
      const currentFeedback = feedback.find(item => item._id === feedbackId);
      if (currentFeedback?.votes.find(v => v.user === user.username)) {
        setFeedback(prev => prev.map(item => 
          item._id === feedbackId 
            ? { ...item, votes: item.votes.filter(v => v.user !== user.username) }
            : item
        ));
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      await api.vote(feedbackId, voteType);
      await loadFeedback(); // Reload to get updated state
      showMessage('Vote recorded!', 'success');
    } catch (error) {
      showMessage('Failed to vote', 'error');
    }
  };

  // Handle delete
  const handleDelete = async (feedbackId: string) => {
    if (confirm('Delete this feedback?')) {
      try {
        await api.deleteFeedback(feedbackId);
        setFeedback(prev => prev.filter(item => item._id !== feedbackId));
        showMessage('Feedback deleted!', 'success');
      } catch (error) {
        showMessage('Failed to delete', 'error');
      }
    }
  };

  // Simple color mapping
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      bug: 'bg-red-50 text-red-700 border-red-200',
      feature: 'bg-blue-50 text-blue-700 border-blue-200',
      improvement: 'bg-green-50 text-green-700 border-green-200',
      other: 'bg-gray-50 text-gray-700 border-gray-200'
    };
    return colors[category] || colors.other;
  };

  if (loading) return <div className="text-center py-16 text-white">Loading...</div>;

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Product Feedback</h1>
        <p className="text-gray-300">Share your ideas and help us improve!</p>
      </div>
      
      {/* Welcome Section */}
      {user ? (
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 mb-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Welcome back, {user.username}! 👋</h2>
          <p className="text-gray-300 mb-6">Ready to share your feedback?</p>
          <Link to="/create" className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700">
            Create New Feedback
          </Link>
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 mb-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Join the Conversation</h2>
          <p className="text-gray-300 mb-6">Create an account to start sharing feedback.</p>
          <div className="space-x-4">
            <Link to="/register" className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700">
              Get Started
            </Link>
            <Link to="/login" className="bg-gray-700 text-gray-200 px-8 py-3 rounded-xl hover:bg-gray-600">
              Sign In
            </Link>
          </div>
        </div>
      )}

      {/* Feedback List */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-6">All Feedback ({feedback.length})</h2>
        
        {feedback.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">💡</div>
            <h3 className="text-xl font-semibold text-white mb-2">No feedback yet</h3>
            {user && <Link to="/create" className="bg-blue-600 text-white px-6 py-2 rounded-lg">Create First Feedback</Link>}
          </div>
        ) : (
          <div className="space-y-6">
            {feedback.map((item) => {
              const upvotes = item.votes.filter(v => v.voteType === 'upvote').length;
              const downvotes = item.votes.filter(v => v.voteType === 'downvote').length;
              const score = upvotes - downvotes;
              const userVote = user ? item.votes.find(v => v.user === user.username) : null;
              const hasUpvoted = userVote?.voteType === 'upvote';
              const hasDownvoted = userVote?.voteType === 'downvote';

              return (
                <div key={item._id} className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
                  <div className="flex gap-4">
                    {/* Vote buttons */}
                    <div className="flex flex-col items-center space-y-2">
                      <button
                        onClick={() => handleVote(item._id, 'upvote')}
                        className={`p-2 rounded ${hasUpvoted ? 'text-green-500 bg-green-50' : 'text-gray-400 hover:text-green-500'}`}
                        disabled={!user}
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <span className="font-bold text-xl text-white">{score}</span>
                      <button
                        onClick={() => handleVote(item._id, 'downvote')}
                        className={`p-2 rounded ${hasDownvoted ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500'}`}
                        disabled={!user}
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-3 py-1 rounded-full text-sm border ${getCategoryColor(item.category)}`}>
                          {item.category}
                        </span>
                        <span className="text-gray-400">by {item.author.username}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-300 mb-4">{item.description}</p>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">{upvotes + downvotes} votes</span>
                        
                        {user && item.author.username === user.username && (
                          <div className="space-x-2">
                            <Link to={`/edit/${item._id}`} className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg">
                              Edit
                            </Link>
                            <button onClick={() => handleDelete(item._id)} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg">
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
