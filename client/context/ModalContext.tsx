import { createContext, useContext, useState } from 'react';

const KeyModalContext = createContext({
  opened: false,
  setOpened: (opened: boolean) => {},
});

function ModalProvider({ children }: { children: React.ReactNode }) {
  const [opened, setOpened] = useState(false);

  return <KeyModalContext.Provider value={{ opened, setOpened }}>{children}</KeyModalContext.Provider>;
}

const useKeyModalContext = () => {
  const context = useContext(KeyModalContext);

  if (!context) {
    throw new Error('useThemeContext must be used inside the ThemeProvider');
  }

  return context;
};

export { ModalProvider, KeyModalContext, useKeyModalContext };
