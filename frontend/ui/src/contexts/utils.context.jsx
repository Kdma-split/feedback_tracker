import { createContext, useContext, useState, useEffect  } from "react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const UtilsContext = createContext(UtilsContext);

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

export const UtilsContextProvider = ({ children }) => {
  return(
    <UtilsContext.Provider value={ setSuccess, setError, validateField }>
      { children }
      <Toaster richColors position="top-right" />
    </UtilsContext.Provider>
  )
};

export const useUtilsContext = () => {
  return useContext(UtilsContext);
}