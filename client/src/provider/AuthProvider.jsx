import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import React, { createContext, useState } from "react";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const authInfo = {
    mal: "sohel",
  };

  //   return <div>{children}</div>;

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
