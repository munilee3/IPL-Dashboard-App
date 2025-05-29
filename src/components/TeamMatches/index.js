import {Component} from 'react'
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import {Link} from 'react-router-dom'
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

  getMatchStatusSummary = matches => {
    const summary = matches.reduce((acc, match) => {
      const status = match.match_status || 'Unknown'
      acc[status] = (acc[status] || 0) + 1
      return acc
    }, {})

    const expectedStatuses = ['Won', 'Lost', 'Draw']
    return expectedStatuses.map(status => ({
      status,
      count: summary[status] || 0,
    }))
  }

  render() {
    const {isLoading, backgroundClassName} = this.state
    const {getTeamMatchesList} = this.state
    const {
      latestMatchDetails,
      recentMatches = [],
      teamBannerUrl,
    } = getTeamMatchesList

    const chartData = this.getMatchStatusSummary(recentMatches)

    return (
      <div
        className={`${backgroundClassName} team-matches`}
        data-testid="loader"
      >
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div className="team-matche-info">
            <Link to={`/`} className="back-button-link">
              <button type="button" className="back-button">
                Back
              </button>
            </Link>
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
            <h1 className="latest-matches-text">Statistics</h1>
            <ResponsiveContainer width="60%" height={300}>
              <PieChart>
                <Pie
                  cx="70%"
                  cy="40%"
                  data={chartData}
                  startAngle={0}
                  endAngle={360}
                  innerRadius="40%"
                  outerRadius="70%"
                  dataKey="count"
                  nameKey="status"
                >
                  <Cell name="Won" fill="#18ed66" />
                  <Cell name="Lost" fill="#e31a1a" />
                  <Cell name="Draw" fill="gray" />
                </Pie>
                <Legend
                  iconType="circle"
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
