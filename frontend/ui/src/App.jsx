import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminAuthVerify from './components/admin_authentication/AdminAuthVerify.jsx';
import AdminVerificationModal from './components/admin_authentication/AdminVerificationModal.jsx';
import SubmitFeedbacksPage from './pages/SubmitFeedbackPage.jsx';
import ShowFeedbacksPage from './pages/ShowFeedbacksPage.jsx';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [success, setSuccess] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [err, setErr] = useState({});

  const handleToggleAdmin = () => {
    setIsOpen(true);
  }

  return (
    <>
      <AdminVerificationModal 
        isOpen={isOpen} 
        isAdmin={isAdmin}
        onClose={() => setIsOpen(false)} 
        setIsAdmin={setIsAdmin}
        setSuccess={setSuccess}
        setErr={setErr}
      />
      <Routes>
        <Route path="/" element={ <SubmitFeedbacksPage isAdmin={ isAdmin } handleToggleAdmin={ handleToggleAdmin } /> }/>
        <Route path="/show-feedbacks" element={
          <AdminAuthVerify>
            <ShowFeedbacksPage isAdmin={ isAdmin } handleToggleAdmin={ handleToggleAdmin } />
          </AdminAuthVerify>
        }/>
        <Route path="*" eleemnt={ <h1> PAGE DOESN'T EXIST !!! </h1> }/>
      </Routes>
    </>
  )
}

export default App;
