import { createContext, useState} from 'react';

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [account, setAccount] = useState('');
  const [walletConnected, setWalletConnected] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        account,
        setAccount,
        walletConnected,
        setWalletConnected
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
