import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class Home extends Component {
  state = {iplTeamsList: {}, isLoading: true}

  componentDidMount() {
    this.getIplTeams()
  }

  getIplTeams = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const iplteam = await response.json()
    const {teams} = iplteam
    const updatedTeamsList = teams.map(eachTeam => ({
      id: eachTeam.id,
      name: eachTeam.name,
      teamImage: eachTeam.team_image_url,
    }))

    this.setState({isLoading: false, iplTeamsList: updatedTeamsList})
  }

  render() {
    const {isLoading, iplTeamsList} = this.state
    return (
      <div className="ipl-dashboard-bg-container">
        <div className="ipl-dashboard">
          <div className="ipl-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="ipl-logo-img"
            />
            <h1 className="ip-dashboard">IPL Dashboard</h1>
          </div>
          <ul className="loader-teams-list-container">
            {isLoading ? (
              <div testid="loader">
                <Loader type="Oval" color="#ffffff" height={50} width={50} />
              </div>
            ) : (
              iplTeamsList.map(team => (
                <TeamCard key={team.id} teamDetails={team} />
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default Home
