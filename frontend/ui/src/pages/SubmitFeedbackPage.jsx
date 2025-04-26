import FeedbackForm from '../components/FeedbackForm.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { useLightDarkMode } from '../contexts/LightDarkToggle.context.jsx';
import ShowHideFeedbackToggle from '../components/ShowHideFeedbackToggle.jsx';

function SubmitFeedbacPage({ isAdmin, handleToggleAdmin }) {
  const { aptTheme } = useLightDarkMode();

  return (
    <div className={`min-h-screen w-screen ${aptTheme.bg_img} bg-cover`}>
      <div className={`min-h-screen flex flex-col bg-transparent`}>
        <div className="container mx-auto flex-grow">
          <Header />

          <div className="relative">
            <ShowHideFeedbackToggle handleToggleAdmin={ handleToggleAdmin }  isAdminn={ isAdmin }/>
            <FeedbackForm />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default SubmitFeedbacPage;