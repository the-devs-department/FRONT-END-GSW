import { createContext, useContext, useState, type ReactNode } from "react";

interface DeleteModalType {
  isDeleteModalOpen: boolean;
  taskIdToDelete: string | null;
  openDeleteModal: (taskId: string) => void;
  closeDeleteModal: () => void;
}

interface DeleteModalProviderProps {
  children: ReactNode
}

export const DeleteModalContext = createContext<DeleteModalType | null>(null)

export const DeleteModalProvider = (props: DeleteModalProviderProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [taskIdToDelete, setTaskIdToDelete] = useState<string | null> (null)
  
  const openDeleteModal = (taskId: string) => {
    if (isDeleteModalOpen) {
      alert("Há uma ação em andamento, cancele ou confirme a ação existente")
    } else {
      setTaskIdToDelete(taskId)
      setIsDeleteModalOpen(true)
    }
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setTaskIdToDelete(null)
  }

  const value = {
    isDeleteModalOpen,
    taskIdToDelete,
    openDeleteModal,
    closeDeleteModal
  }

  return (
    <DeleteModalContext.Provider value={value}>
      {props.children}
    </DeleteModalContext.Provider>
  )
}

export const useDeleteModal = () => {
  const context = useContext(DeleteModalContext);
  if (!context) {
    throw new Error('useDeleteModal deve ser usado dentro de um DeleteModalProvider');
  }
  return context;
};