import React, { createContext, useState } from 'react';

export const ThemeContext = createContext<any>({
  theme: 'light',
  setTheme: null,
});
