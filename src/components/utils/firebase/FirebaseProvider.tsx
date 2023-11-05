import React, { createContext, useState } from 'react';
import { firebaseConfig } from './firebaseConfig';
import { initializeApp } from 'firebase/app';

export const FirebaseContext = createContext<any>({
  app: null,
  user: null,
  setUser: null,
});

const FirebaseProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState();
  console.log('here');
  return (
    <FirebaseContext.Provider
      value={{ app: null, user: user, setUser: setUser }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
