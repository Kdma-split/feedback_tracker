import { useState, useEffect } from 'react';
import { Link, useNavigate }  from 'react-router-dom';

const AdminVerificationModal = ({ 
  isOpen = false,,
  setIsAdmin = () => {},
  onClose = () => {} , 
  setSuccess = () => {}, 
  setErr = () => {} 
}) => {
  const [adminUser, setAdminUser] = useState('');
  const [password, setPassword] = useState('');
  const [clicked, setClicked] = useState('false')
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('adminName')) return;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setClicked(true);
    console.log('Admin authentication attempt with:', { adminUser, password });

    if (!adminUser) {
      setErr( prevErrors => ({
        ...prevErrors,
        event: 'Admin Verification',
        message: 'Give a proper name !!!'
      }));
      setClicked(false);
    }
    
    if (!password) {
      setErr( prevErrors => ({
        ...prevErrors,
        event: 'Admin Verification',
        message: 'Give a proper name !!!'
      }));
      setClicked(false);
    }
    
    // DEVELOPMENT STAGE LOGIN TO BYPASS THE ADMIN AUTHENTICATION PART...
    if (adminUser === 'admin' && password === 'admin123') {
      setSuccess( prevSuccess => ({
        ...prevSuccess,
        event: 'Admin Verification',
        message: 'Authenticated as an admin !!!'
      }))
      setIsAdmin(true);
      navigate('/showfeedbacks');
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 ${isOpen ? 'animate-modal-popup' : 'animate-modal-popdown'}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sm:p-8 w-full max-w-md max-h-screen overflow-y-auto shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Login to MemoTag</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="adminUser" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              id="adminUser"
              type="text"
              value={adminUser}
              onChange={(e) => setAdminUser(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Type in admin to surpass"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Type in admin123 to surpass"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Remember me</span>
            </label>
            <Link to="/see-feedbacks" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Verify
          </button>
        </form>

        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 flex justify-center items-center ${clicked ? 'pointer-events-none' : 'cursor-pointer'} ${clicked ? 'bg-blue-700' : 'bg-blue-600'} ${clicked ? 'text-gray-400' : 'text-white'}`}
          onSubmit={ handleSubmit }
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default AdminVerificationModal;
