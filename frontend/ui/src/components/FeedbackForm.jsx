import { useState } from 'react';
import { useLightDarkMode } from '../contexts/LightDarkToggle.context.jsx';
  
function FeedbackForm() {
  const { aptTheme } = useLightDarkMode();
  const [ clicked, setClicked ] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Feedback message is required';
    } else if (formData.message.trim().length < 3) {
      newErrors.message = 'Message should be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!errors) setClicked(true);
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await fetch (`${import.meta.env.VITE_API_QUERY_ENDPOINT + '/feedbacks'}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        // onSubmitSuccess();
      } 
      else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error Occured while data transfer to the server: \n:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  return (
    <div className={`max-w-md mx-auto my-8 p-6 ${aptTheme.baseColor} rounded-lg shadow-2xl shadow-blue-900 backdrop-blur-sm transition-all animate-fade-in-scale`}>
      <h2 className={`text-xl font-semibold mb-4 ${aptTheme.headingText}`}>Share Your Feedback</h2>
      
      {submitStatus === 'success' && (
        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-md">
          Your feedback has been submitted successfully!
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-md">
          There was an error submitting your feedback. Please try again.
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 font-medium dark:text-gray-200">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-300 dark:text-white focus:border-2-gray-300 ${
              errors.name ? 'border-red-500 dark:border-red-400' : 'border-gray-300'
            }`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.name}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium dark:text-gray-200">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors.email ? 'border-red-500 dark:border-red-400' : 'border-gray-300'
            } active:border-2-gray-300`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.email}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="message" className="block mb-1 font-medium dark:text-gray-200">Feedback Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors.message ? 'border-red-500 dark:border-red-400' : 'border-gray-300'
            }`}
          ></textarea>
          {errors.message && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.message}</p>}
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 flex justify-center items-center ${clicked ? 'pointer-events-none' : 'cursor-pointer'} ${clicked ? 'bg-blue-700' : 'bg-blue-600'} ${clicked ? 'text-gray-400' : 'text-white'}`}
          onSubmit={ handleSubmit }
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            'Submit Feedback'
          )}
        </button>
      </form>
    </div>
  );
}

export default FeedbackForm;
