// useDeleteModal.ts
import { useContext } from 'react';
import { deleteModalContext } from '../context/ModalContext';

export const useDeleteModal = () => {
  const context = useContext(deleteModalContext);
  if (!context) {
    throw new Error('useDeleteModal deve ser usado dentro de um DeleteModalProvider');
  }
  return context;
};