import { useLightDarkMode } from "../contexts/LightDarkToggle.context.jsx";

function Footer() {
  const { aptTheme } = useLightDarkMode();

  return (
    <footer className={`py-3 mt-5 text-center backdrop-blur-xs animate-fade-in-scale ${aptTheme.paragraphText2} text-sm ${aptTheme.footer_gradient}`}>
      <div className={`container mx-auto`}>
        <p>&copy; {new Date().getFullYear()} Feedback Collector</p>
        <p className="mt-1 font-medium">Created by Arkadip - on April 25, 2025</p>
      </div>
    </footer>
  );
}
  
export default Footer;