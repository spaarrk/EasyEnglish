import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import TestStore from './store/TestStore';
import VocabularyStore from './store/VocabularyStore';
import GrammarStore from './store/GrammarStore';
import './i18next.js';
import { theme } from './theme.js';
import { ThemeProvider } from '@mui/material';
export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Context.Provider
        value={{
          userStore: new UserStore(),
          testStore: new TestStore(),
          vocabulary: new VocabularyStore(),
          grammar: new GrammarStore(),
        }}
      >
        <App />
      </Context.Provider>
    </ThemeProvider>
  </React.StrictMode>
);
