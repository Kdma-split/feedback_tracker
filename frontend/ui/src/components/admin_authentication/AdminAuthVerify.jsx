// import React from 'react'
// import { useNavigate } from 'react-router-dom';

// function AdminAuthVerify({ children }) {
//   const navigate = useNavigate();

//   if (localStorage.getItem('adminName')) {
//     return (
//       <div>
//           { children }
//       </div>
//     )
//   }
//   else {
//     navigate('/');
//     return;
//   }
// }

// export default AdminAuthVerify;



import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminAuthVerify({ children }) {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('adminName');

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null; 
  }

  return (
    <div>
      {children}
    </div>
  );
}

export default AdminAuthVerify;
