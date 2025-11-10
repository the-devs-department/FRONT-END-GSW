import './TeamCard.css'
import groupIcon from '../../assets/group.png'

interface TeamCardProps {
  abreviation: string,
  name: string
}


export default function TeamCard(props: TeamCardProps) {
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
          <span className='team-dots'>
            <div></div>
            <div></div>
            <div></div>
          </span>
        </div>
        <div className='team-card-members'>
          <img src={groupIcon} alt="" className='h-6'/>
          <p>Visualizar membros da equipe</p>
        </div>
        <div className='team-card-selector'>
          <input type="radio" name="selected-team" value={props.name} className='selector-input'/>
        </div>
      </div>
    </>
  )
}