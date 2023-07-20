
import PropTypes from "prop-types";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const setLocalStorageWithExpiration = (key, value, expirationDays) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expirationDays);

    const item = {
      value: value,
      expiration: expirationDate.getTime(),
    };

    localStorage.setItem(key, JSON.stringify(item));
  };

  const login = async (email, password) => {
    const res = await axios.post(
      "http://localhost:3000/login",
      {email, password},
      {
        withCredentials: true,
      }
    );

    setCurrentUser(res.data);
    setLocalStorageWithExpiration("user", res.data, 90); // Set expiration for 90 days (three months)
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}; 
AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired
} 

