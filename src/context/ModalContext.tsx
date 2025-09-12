import React, { createContext, useState , type ReactNode } from 'react';

interface DeleteModalContextType {
  isDeleteModalOpen: boolean;
  openDeleteModal: () => void;
  closeDeleteModal: () => void;
}

const deleteModalContext = createContext<DeleteModalContextType | null>(null)

interface DeleteModalProviderProps {
  children: ReactNode;
}


export const DeleteModalProvider: React.FC<DeleteModalProviderProps> = ({ children }) => {
  const [isDeleteModalOpen ,setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const value = { isDeleteModalOpen, openDeleteModal, closeDeleteModal };

  return (
    <deleteModalContext.Provider value={value}>
      {children}
    </deleteModalContext.Provider>
  );
};