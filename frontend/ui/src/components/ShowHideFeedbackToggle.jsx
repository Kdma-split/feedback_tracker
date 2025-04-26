import React from 'react'

function ShowHideFeedbackToggle({ isAdmin, handleToggleAdmin }) {
  return (
    <div className='absolute top-1/2 right-0'>
      <button
        onClick={isAdmin ? handleToggleAdmin : (x) => {x}}
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 animate-fade-in-scale"
      >
        
        {isAdmin ? 'Hide Feedback' : 'View Submitted Feedback'}
      </button>
    </div>
  )
}

export default ShowHideFeedbackToggle; 

