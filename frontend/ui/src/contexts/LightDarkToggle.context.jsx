import React, { createContext, useContext, useState, useEffect } from 'react';
const LightDarkModeContext = createContext();

const themes = {
  light: {
    headingText: 'text-black',
    paragraphText: 'text-slate-900',
    paragraphText2: 'text-slate-850',
    baseColor: 'bg-purple-[#DCCCF5]/50',
    boxShadow: 'shadow-stone-900',
    border: 'border-slate-600',
    active_border: 'border-2 border-slate-600',
    footer_gradient: 'bg-linear-to-t from-indigo-500 to-indigo-100/0',
    header_gradient: 'bg-linear-to-b from-indigo-500 to-indigo-100/0',
    bg_img: 'bg-[url(https://thumb.ac-illust.com/4d/4db863af9abb2caae291b32a58087a8e_t.jpeg)]',
  },
  dark: {
    headingText: 'text-white',
    paragraphText: 'text-gray-200', 
    paragraphText2: 'text-gray-300', 
    baseColor: 'bg-gray-900/50',
    boxShadow: 'shadow-stone-900',
    border: 'border-gray-600',
    active_border: 'border-2 border-white',
    footer_gradient: 'bg-linear-to-t from-black to-gray-700/0',
    header_gradient: 'bg-linear-to-b from-black to-gray-700/0',
    bg_img: 'bg-[url(https://i.ytimg.com/vi/CoOllJNUiV8/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGDcgZihyMA8=&rs=AOn4CLA8q3DX2sDHPqc3UBkyGRz_YOKECQ)]',
  }
};

const getInitialMode = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPreference = window.localStorage.getItem('darkMode');
    if (storedPreference !== null) {
      return storedPreference === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return true; 
};

export const LightDarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(getInitialMode);
  const [aptTheme, setAptTheme] = useState(() =>
    getInitialMode() ? themes.dark : themes.light
  );

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    window.localStorage.setItem('darkMode', String(darkMode)); 
    setAptTheme(darkMode ? themes.dark : themes.light);
  }, [darkMode]);

  return (
    <LightDarkModeContext.Provider value={{ darkMode, toggleDarkMode, aptTheme }}>
      {children}
    </LightDarkModeContext.Provider>
  );
};

export const useLightDarkMode = () => {
  const context = useContext(LightDarkModeContext);
  if (context === undefined) {
    throw new Error('useLightDarkMode must be used within a LightDarkModeProvider');
  }
  return context;
};