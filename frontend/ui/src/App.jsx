import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminAuthVerify from './components/admin_authentication/AdminAuthVerify.jsx';
import SubmitFeedbacksPage from './pages/ShowFeedbacksPage.jsx';
import ShowFeedbacksPage from './pages/ShowFeedbacksPage.jsx';
import AdminVerificationModal from './components/admin_authentication/AdminVerificationModal.jsx';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleToggleAdmin = () => {
    setIsOpen(true);
    return <AdminVerificationModal isOpen={ isOpen } onClose={ setIsOpen(false) } isAdmin={ setIsAdmin }/>
  }

  return (
    <Routes>
      <Route path="/" eleemnt={ <SubmitFeedbacksPage isAdmin={ isAdmin } handleToggleAdmin={ handleToggleAdmin } /> }/>
      <Route path="/show-feedbacks" eleemnt={
        <AdminAuthVerify>
          <ShowFeedbacksPage isAdmin={ isAdmin } handleToggleAdmin={ handleToggleAdmin } />
        </AdminAuthVerify>
      }/>
    </Routes>
  )
}

export default App