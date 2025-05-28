import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {teamDetails} = props
  const {id, name, teamImage} = teamDetails
  return (
    <Link to={`team-matches/${id}`} className="ipl-team-link">
      <li className="ipl-team-list">
        <img src={teamImage} alt={name} className="team-image" />
        <p className="team-name">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
