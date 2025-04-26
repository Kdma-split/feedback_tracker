import React from 'react'
import { useNavigate } from 'react-router-dom';

function AdminAuthVerify({ children }) {
  const navigate = useNavigate();

  if (localStorage.getItem('adminName')) {
    return (
      <div>
          { children }
      </div>
    )
  }
  else {
    navigate('/');
    return;
  }
}

export default AdminAuthVerify;