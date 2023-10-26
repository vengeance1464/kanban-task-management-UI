import React, { createContext, useState } from 'react';

export const ThemeContext = createContext<any>({
  theme: 'light',
  setTheme: null,
});

// const ThemeSwitchProvider: React.FC<any> = ({ children }) => {
//   const [theme, setTheme] = useState('light');
//   console.log('here');
//   return (
//     <ThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

//export default ThemeSwitchProvider;
