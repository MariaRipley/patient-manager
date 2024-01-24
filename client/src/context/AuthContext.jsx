import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest } from "../api/auth.js";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);

  //Función para recibir datos de usuario (registro)
  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error.response);
      setErrors(error.response.data);
    }
  };

  //Función para recibir datos de usuario (login)
  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res);
    } catch (error) {
      let errorArray = [];
      if (Array.isArray(error.response.data)) {
        errorArray = error.response.data;
      } else {
        errorArray = [error.response.data.message];
      }
      setErrors(errorArray);
    }
  };

  //Hacer que los mensajes de error desaparezcan después de un tiempo
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
