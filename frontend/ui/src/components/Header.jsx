import LightDarkToggleBtn from "./LightDarkToggleBtn.jsx";
import { useLightDarkMode } from "../contexts/LightDarkToggle.context.jsx"; 

function Header() {
  const { aptTheme } = useLightDarkMode();

    return (
      <header className={`mb-4 relative bg-linear-to-b from-black to-gray-700/0 backdrop-blur-xs animate-fade-in-scale`}>
        <div className="py-5">
          <h1 className={`${aptTheme.headingText} text-3xl font-bold text-center dark:text-white`}>Feedback Collector</h1>
          <p className={`text-center ${aptTheme.paragraphText} mt-2`}>
            Your opinions, our priorities! Please share your thoughts with us.
          </p>
        </div>
        <div className="pr-8 pb-6 inline absolute top-1/3 right-8">
          <LightDarkToggleBtn />
        </div>
      </header>
    );
  }
  
  export default Header;