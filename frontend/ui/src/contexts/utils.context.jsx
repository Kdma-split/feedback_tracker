import { createContext, useContext, useState, useEffect  } from "react";

const UtilsContext = createContext(UtilsContext);

export const UtilsContextProvider = ({ children }) => {
  const successSchema = {
      event: '',
      message: '',
  };
  const errorSchema = {
      event: '',
      message: '',
  };
  const [ success, setSuccess ] = useState(successSchema);
  const [ error, setError ] = useState(errorSchema);
  
  useEffect(() => {
    if (success) return toast.success(success.message);
    if (error) return toast.error(error.message);
  }, [success, error]);
  
  const validateField = (fieldName) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const nameRegex= /^[a-zA-Z]+([ '-][a-zA-Z]+)*$ /;

      const regex = `${fieldName + 'Regex'}`;
      return regex.test(fieldName);
  };

  return(
    <UtilsContext.Provider value={{ setSuccess, setError, validateField }}>
      { children }
      <Toaster richColors position="top-right" />
    </UtilsContext.Provider>
  )
};

export const useUtilsContext = () => {
  return useContext(UtilsContext);
}