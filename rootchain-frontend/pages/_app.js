import '../styles/globals.css';
import React, { useState, createContext, useEffect } from 'react';
import { FirebaseProvider } from '../contexts/FirebaseContext';

export const UserContext = createContext();

const MyApp = ({ Component, pageProps }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  const userContext = {
    isAuthenticated,
    setIsAuthenticated,
    displayName,
    setDisplayName,
    photoURL,
    setPhotoURL,
  };

  useEffect(() => {
    if (localStorage.displayName && localStorage.photoURL) {
      setIsAuthenticated(true);
      setDisplayName(localStorage.displayName);
      setPhotoURL(localStorage.photoURL);
    }
  }, []);

  return (
    <FirebaseProvider>
      <UserContext.Provider value={userContext}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </FirebaseProvider>
  );
};

export default MyApp;
