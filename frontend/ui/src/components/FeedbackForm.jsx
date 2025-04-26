import { useState } from 'react';
import { useLightDarkMode } from '../contexts/LightDarkToggle.context.jsx';

function FeedbackForm() {
  const { aptTheme, darkMode } = useLightDarkMode();
  const [clicked, setClicked] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setClicked(true);

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_QUERY_ENDPOINT}/submit-feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error while sending feedback:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  return (
    <div className={`max-w-md w-full mx-auto my-8 p-6 rounded-lg shadow-2xl backdrop-blur-sm transition-all animate-fade-in-scale ${aptTheme.baseColor} ${aptTheme.boxShadow}`}>
      <h2 className={`text-xl font-semibold mb-4 ${aptTheme.headingText}`}>Share Your Feedback</h2>

      {submitStatus === 'success' && (
        <div className="mb-4 p-3 rounded-md bg-green-700/10 text-green-300">
          Thanks for your feedback! We'll see to it.
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="mb-4 p-3 rounded-md bg-red-700/10 text-red-300">
          There was an error submitting your feedback. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="mb-4">
          <label htmlFor="name" className={`block mb-1 font-medium ${aptTheme.paragraphText}`}>
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-md ${darkMode ? 'border-white' : 'border-slate-600'} ${errors.name ? 'border-red-500 dark:border-red-400' : ''}`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        {/* Email Address */}
        <div className="mb-4">
          <label htmlFor="email" className={`block mb-1 font-medium ${aptTheme.paragraphText}`}>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-md ${darkMode ? 'border-white' : 'border-slate-600'} ${errors.name ? 'border-red-500 dark:border-red-400' : ''}`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        {/* Feedback Message */}
        <div className="mb-6">
          <label htmlFor="message" className={`block mb-1 font-medium ${aptTheme.paragraphText}`}>
            Feedback Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className={`w-full px-3 py-2 rounded-md ${darkMode ? 'border-white' : 'border-slate-600'} ${errors.name ? 'border-red-500 dark:border-red-400' : ''}`}
          />
          {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-md flex justify-center items-center transition duration-200 ${
            clicked ? 'pointer-events-none bg-blue-700 text-gray-400' : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
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
