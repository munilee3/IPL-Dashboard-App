import './index.css'

const LatestMatch = props => {
  const {latestMatchDetails} = props
  const {
    competing_team,
    competing_team_logo,
    date,
    first_innings,
    man_of_the_match,
    result,
    second_innings,
    umpires,
    venue,
  } = latestMatchDetails
  return (
    <div className="latest-match-container">
      <div className="latest-match-details">
        <div className="match-vanue">
          <p className="team">{competing_team}</p>
          <p className="team">{date}</p>
          <p className="match-vanue-info">{venue}</p>
          <p className="match-vanue-info">{result}</p>
        </div>
        <img
          src={competing_team_logo}
          alt={`latest match ${competing_team}`}
          className="competing-team-logo"
        />
      </div>
      <hr className="line-style" />
      <div className="match-info">
        <p className="team-info-heading">First Innings</p>
        <p className="team-info">{first_innings}</p>
        <p className="team-info-heading">Second Innings</p>
        <p className="team-info">{second_innings}</p>
        <p className="team-info-heading">Man Of The Match</p>
        <p className="team-info">{man_of_the_match}</p>
        <p className="team-info-heading">Umpires</p>
        <p className="team-info">{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
