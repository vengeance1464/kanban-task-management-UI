import { PaletteMode, ThemeProvider } from '@mui/material';
import React, { useState } from 'react';
import FirebaseProvider from './components/utils/firebase/FirebaseProvider';
import { ThemeContext } from './themes/ThemeProvider';
import { getTheme } from './themes/theme';
import { Provider } from 'react-redux';
import App from './App';
import app from './components/utils/firebase/firebaseConfig';
import store from './redux/store';
import { createGlobalStyle } from 'styled-components';

const Bootstrap = () => {
  const [theme, setTheme] = useState<PaletteMode>('light');

  const GlobalStyle = createGlobalStyle`
    body {
      background-color: ${(props: { lightTheme: any }) =>
        props.lightTheme ? '#F4F7FD' : '#20212C'};
    }
  `;

  return (
    <ThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
      <ThemeProvider theme={getTheme(theme)}>
        <GlobalStyle lightTheme={theme === 'light'} />
        {/* <GlobalStyles styles={{ body: { backgroundColor: '#F4F7FD' } }} /> */}
        <FirebaseProvider values={{ app: app, user: null, setUser: null }}>
          <Provider store={store}>
            <App />
          </Provider>
        </FirebaseProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default Bootstrap;
