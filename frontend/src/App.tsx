import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { AuthForm } from './components/AuthForm';
import { FeedbackForm } from './components/FeedbackForm';
import { FlashMessage } from './components/FlashMessage';

interface User {
  username: string;
  email: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [flash, setFlash] = useState<{message: string, type: string} | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const showMessage = (message: string, type: string) => setFlash({message, type});
  const hideMessage = () => setFlash(null);
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    showMessage('Logged out!', 'success');
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col">
        <Header user={user} onLogout={logout} />
        <main className="flex-1 py-8 sm:py-12">
          <Routes>
            <Route path="/" element={<Home user={user} showMessage={showMessage} />} />
            <Route path="/create" element={user ? <FeedbackForm user={user} showMessage={showMessage} /> : <Navigate to="/login" />} />
            <Route path="/edit/:id" element={user ? <FeedbackForm user={user} showMessage={showMessage} edit /> : <Navigate to="/login" />} />
            <Route path="/login" element={!user ? <AuthForm setUser={setUser} showMessage={showMessage} /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <AuthForm setUser={setUser} showMessage={showMessage} register /> : <Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
        {flash && <FlashMessage message={flash.message} type={flash.type} onClose={hideMessage} />}
      </div>
    </Router>
  );
}

export default App;
