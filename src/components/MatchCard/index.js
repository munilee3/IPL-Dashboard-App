import './index.css'

const MatchCard = props => {
  const {matchDetails} = props
  const {competing_team, competing_team_logo, result, match_status} =
    matchDetails
  const matchStatusClassName =
    match_status === 'Won' ? 'match-status-won' : 'match-status-lost'
  return (
    <li className="match-card-container">
      <img
        src={competing_team_logo}
        alt={`competing team ${competing_team}`}
        className="competing-team-logo"
      />
      <p className="team-title">{competing_team}</p>
      <p className="match-result">{result}</p>
      <p className={`team-title ${matchStatusClassName}`}>{match_status}</p>
    </li>
  )
}

export default MatchCard
