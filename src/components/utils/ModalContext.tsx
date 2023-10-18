import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PropsWithChildren } from '../../react-app-env';

interface ModalContextProps {
  isModalOpen: boolean;
  modalContent: ReactNode | null;
  showModal: (content: ReactNode) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<PropsWithChildren<any>> = ({
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const showModal = (content: ReactNode) => {
    setIsModalOpen(true);
    setModalContent(content);
  };

  const hideModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider
      value={{ isModalOpen, modalContent, showModal, hideModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};
