import { createContext, useContext, useState, type ReactNode } from "react"
import type Tarefa from "../Interface/TarefaInterface"


interface TaskModalType {
  isTaskModalOpen: boolean,
  modalType: "Nova" | "Atualizar" | null,
  taskToUpdate: Tarefa | null
  openTaskModal: (type: "Nova" | "Atualizar", task?: Tarefa) => void,
  closeTaskModal: () => void,
}

const TaskModalContext = createContext<TaskModalType | null> (null)

interface TaskModalProviderProps {
  children: ReactNode
}

export const TaskModalProvider = (props: TaskModalProviderProps) => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [modalType, setModalType] = useState<"Nova" | "Atualizar" | null> (null)
  const [taskToUpdate, setTaskToUpdate] = useState<Tarefa | null> (null)

  const openTaskModal = (type: "Nova" | "Atualizar", task?: Tarefa) => {
    setModalType(type)
    setIsTaskModalOpen(true)
    if (type === 'Atualizar' && task) {
      setTaskToUpdate(task)
    }
  }

  const closeTaskModal = () => {
    setModalType(null)
    setIsTaskModalOpen(false)
    setTaskToUpdate(null)
  }

  const value = {
    isTaskModalOpen,
    modalType,
    taskToUpdate,
    openTaskModal,
    closeTaskModal
    
  }

  return (
    <TaskModalContext.Provider value={value}>
      {props.children}
    </TaskModalContext.Provider>
  )
}

export const useTaskModal = () => {
  const taskContext = useContext(TaskModalContext)
  if (!taskContext) {
    throw new Error('useTaskModal deve ser usado dentro de um TaskModal Provider')
  }
  return taskContext
}