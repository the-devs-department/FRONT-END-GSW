import { createContext, useContext, useState, type ReactNode } from "react"

interface Team {
  nome: string,
  membros: string[],
  admins: string[]
}

interface TeamModalType {
  isTeamModalOpen: boolean,
  teamModalType: "New Team" | "Edit Team" | null,
  teamToUpdate: Team | null,
  openTeamModal: (type: "New Team" | "Edit Team", team?: Team) => void
  closeTeamModal: () => void
}

const TeamModalContext = createContext<TeamModalType | null> (null)

interface TeamModalProividerProps {
  children: ReactNode
}

export const TeamModalProvider = (props: TeamModalProividerProps) => {
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false)
  const [teamModalType, setTeamModalType] = useState<"New Team" | "Edit Team" | null> (null)
  const [teamToUpdate, setTeamToUpdate] = useState<Team|null>(null)

  const openTeamModal = (type: "New Team" | "Edit Team", team?: Team) => {
    setTeamModalType(type)
    setIsTeamModalOpen(true)
    if (type === 'Edit Team' && team) {
      setTeamToUpdate(team)
    }
  }

  const closeTeamModal = () => {
    setTeamModalType(null)
    setIsTeamModalOpen(false)
    setTeamToUpdate(null)
  }

  const value = {
    isTeamModalOpen,
    teamModalType,
    teamToUpdate,
    openTeamModal,
    closeTeamModal
  }

  return (
    <TeamModalContext.Provider value={value}>
      {props.children}
    </TeamModalContext.Provider>
  )
}

export const useTeamModal = () => {
  const teamContext = useContext(TeamModalContext)
  if(!teamContext) {
    throw new Error('useTeamModal deve ser usado dentro de um TeamModalContext')
  }
  return teamContext
}