// src/components/FeedbackList.jsx
import { useState, useEffect } from 'react';
import { useLightDarkMode } from '../contexts/LightDarkToggle.context.jsx';

function FeedbackList({ loading }) {
  const [feedbacksList, setFeedbacksList] = useState([]);
  const { aptTheme } = useLightDarkMode();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        console.log(`${import.meta.env.VITE_API_QUERY_ENDPOINT + '/feedbacks'}`);
        const { data } = await fetch(`${import.meta.env.VITE_API_QUERY_ENDPOINT + '/feedbacks'}`);
        console.log(data)
        const response = JSON.parse(data);
        console.log ("DATA FETCHING STATUS [ALL FEEDBACKS]", response.status);
        if (response.status === 'success') {
          const feedbacks = response.data;
          setFeedbacksList(feedbacks);
        }
        else {
          console.log('ERROR WHILE FETCHING TE FEEDBACK !!!');
        }
      }
      catch (error) {
        console.error("ERROR CONNECTING TO THE SERVER!!! \n", error);
      }
    }

    fetchFeedbacks();
  }, []);
 
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Hold Tight, loading entries...</p>
      </div>
    );
  }
  if (feedbacksList.length === 0) {
    return (
      <div className="text-center py-12">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <p className="mt-2 text-gray-600 dark:text-gray-300">No feedback entries available.</p>
      </div>
    );
  }

  const feedbackAnimationKeyframes = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `
  ;
  return (
    <div className="mt-6">
      <style>{feedbackAnimationKeyframes}</style>
      <h2 className={`text-xl font-semibold mb-4 ${aptTheme.headingText}`}>
        Submitted Feedback ({feedbacksList.length})
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbacksList.map((feedback, index) => (
          <div 
            key={index}
            className={`rounded-lg overflow-hidden border backdrop-blur-sm transition-all
              ${aptTheme.baseColor}
              ${aptTheme.boxShadow}
              border-purple-200 dark:border-gray-700
              hover:shadow-lg`}
            style={{
              animation: `fadeInUp 0.5s ease-out forwards`,
              animationDelay: `${index * 0.1}s`,
              opacity: 0
            }}
          >
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <h3 className={`font-bold text-lg ${aptTheme.headingText}`}>
                  {feedback.name}
                </h3>
                <span className={`text-xs px-2 py-1 rounded-full ${aptTheme.baseColor} ${aptTheme.paragraphText2}`}>
                  {feedback.createdAt}
                </span>
              </div>
              
              <div className={`mb-3 text-sm ${aptTheme.paragraphText2}`}>
                <span className="inline-block bg-purple-100 dark:bg-gray-800 rounded-full px-3 py-1 text-sm">
                  {feedback.email}
                </span>
              </div>
              
              <div className={`border-t border-purple-100 dark:border-gray-700 pt-3 ${aptTheme.paragraphText}`}>
                <p className="text-sm leading-relaxed">{feedback.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {feedbacksList.length === 0 && (
        <div className={`text-center py-12 ${aptTheme.paragraphText}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="mt-2">No feedback entries available.</p>
        </div>
      )}
    </div>
  );
}

export default FeedbackList;