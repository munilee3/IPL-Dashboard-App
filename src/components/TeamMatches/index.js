import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

const listOfColors2 = [
  'color1',
  'color2',
  'color3',
  'color4',
  'color5',
  'color6',
]

class TeamMatches extends Component {
  state = {
    getTeamMatchesList: {},
    isLoading: true,
    backgroundClassName: '',
  }

  componentDidMount() {
    this.getTeamInfo()
    const randomBackgroundClassName = Math.ceil(
      Math.random() * listOfColors2.length - 1,
    )
    this.setState({
      backgroundClassName: listOfColors2[randomBackgroundClassName],
    })
  }

  getTeamInfo = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const updatedData = {
      latestMatchDetails: data.latest_match_details,
      recentMatches: data.recent_matches,
      teamBannerUrl: data.team_banner_url,
    }

    this.setState({
      isLoading: false,
      getTeamMatchesList: updatedData,
    })
  }

  render() {
    const {isLoading, backgroundClassName} = this.state
    const {getTeamMatchesList} = this.state
    const {latestMatchDetails, recentMatches, teamBannerUrl} =
      getTeamMatchesList
    console.log(latestMatchDetails)
    console.log(recentMatches)
    return (
      <div className={`${backgroundClassName} team-matches`}>
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div className="team-matche-info">
            <img
              src={teamBannerUrl}
              alt="team banner"
              className="team-banner-img"
            />
            <h1 className="latest-matches-text">Latest Matches</h1>
            <LatestMatch
              key={latestMatchDetails.id}
              latestMatchDetails={latestMatchDetails}
            />
            <ul className="match-cards">
              {recentMatches.map(eachMatch => (
                <MatchCard key={eachMatch.id} matchDetails={eachMatch} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
