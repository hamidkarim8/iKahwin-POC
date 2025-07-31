import React, { createContext, useContext, useState } from 'react';

const SupportModalContext = createContext();

export const useSupportModal = () => {
  const context = useContext(SupportModalContext);
  if (!context) {
    throw new Error('useSupportModal must be used within a SupportModalProvider');
  }
  return context;
};

export const SupportModalProvider = ({ children }) => {
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const openSupportModal = () => setIsSupportModalOpen(true);
  const closeSupportModal = () => setIsSupportModalOpen(false);

  return (
    <SupportModalContext.Provider value={{
      isSupportModalOpen,
      openSupportModal,
      closeSupportModal,
    }}>
      {children}
    </SupportModalContext.Provider>
  );
}; 