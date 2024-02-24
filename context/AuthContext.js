import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
  } from "firebase/auth";
  import { createContext, useContext, useEffect, useState } from "react";
  import { auth } from "../firebase";
  
  const AuthContext = createContext();
  
  export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
  
    const googleSignIn = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          const email = result.user.email;
          // Check if the email domain is allowed
          if (email.endsWith('@paruluniversity.ac.in')) {
            // Allow access
            setUser(result.user);
          } else {
            // Disallow access
            alert("Access denied. You must use your college email to sign in.");
            signOut(auth); // Sign out the unauthorized user
          }
        })
        .catch((error) => {
          // Handle errors
          console.error(error);
        });
    };
  
    const logOut = () => {
      signOut(auth);
    };
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
      return () => unsubscribe();
    }, [user]);
  
    return (
      <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const UserAuth = () => {
    return useContext(AuthContext);
  };
  