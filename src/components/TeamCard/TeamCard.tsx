import './TeamCard.css'
import { useState } from 'react'
import TeamModalOpc from '../TeamModalOpc/TeamModalOpc'
import type Team from '../../Interface/TeamInterface'

interface TeamCardProps {
  abreviation: string,
  name: string,
  team?: Team
}

export default function TeamCard(props: TeamCardProps) {
  const [opcOpen, setOpcOpen] = useState(false)

  const teamObj: Team = props.team ?? { nome: props.name, membros: [], admins: [] }

  const toggleOpc = (ev?: React.MouseEvent) => {
    ev?.stopPropagation()
    setOpcOpen(v => !v)
  }

  return (
    <>
      <div className="team-card">
        <div className='team-card-infos'>
          <div className='team-card-previous'>
            <h2>{props.abreviation}</h2>
          </div>
          <div className='team-card-titles'>
            <h2>{props.name}</h2>
          </div>
          <span className='team-dots' onClick={toggleOpc} role="button" aria-label="abrir opções">
            <div></div>
            <div></div>
            <div></div>
          </span>
        </div>
        <div className='team-card-selector'>
          <input type="radio" name="selected-team" value={props.name} className='selector-input'/>
        </div>
        <TeamModalOpc teamModalCondition={opcOpen} team={teamObj} />
      </div>
    </>
  )
}