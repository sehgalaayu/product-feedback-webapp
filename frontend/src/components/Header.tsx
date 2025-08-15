import { Link } from 'react-router-dom';

interface User {
  username: string;
  email: string;
}

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

export const Header = ({ user, onLogout }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 py-4">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-center">
          <nav className="bg-black/80 backdrop-blur-md border border-gray-700 rounded-full px-6 py-3 flex items-center space-x-6">
            <Link to="/" className="text-lg font-bold text-white hover:text-blue-400 transition-colors">
              Product Feedback
            </Link>
            
            <div className="w-px h-6 bg-gray-600"></div>
            
            {user ? (
              <>
                <Link to="/create" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors font-medium text-sm">
                  Create
                </Link>
                <div className="w-px h-6 bg-gray-600"></div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-300 text-sm">Welcome, <span className="font-semibold text-white">{user.username}</span></span>
                  <button onClick={onLogout} className="text-gray-400 hover:text-red-400 transition-colors font-medium text-sm">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors font-medium text-sm">
                  Login
                </Link>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors font-medium text-sm">
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
