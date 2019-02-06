import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from "react-redux"
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import axios from 'axios'
import { togglePageLoad, saveAllTeams, saveAllPlayerPositions } from '../../../js/actions/index'
import ScSelect from '../form-elements/ScSelect'

const mapStateToProps = (state) => ({ 
  teams: state.teams,
  user: state.user,
  positions: state.positions
})

const batsOptions = [
  { value: 'R', label: 'Right' },
  { value: 'L', label: 'Left' },
  { value: 'S', label: 'Switch' }
]

const throwsOptions = [
    { value: 'R', label: 'Right' },
    { value: 'L', label: 'Left' }
]

class PlayersAdd extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      first_name: '',
      last_name: '',
      team_id: '',
      user_id: props.user.id,
      primary_position_id: '',
      bats: '',
      throws: '',
      isHidden: true,
      isLoading: true
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.state.isLoading = true

    const getTeams = axios.get('/api/teams')
      .then((result) => {
        if(result.status === 200) {
          if (this.state.isLoading) { 
            store.dispatch( saveAllTeams({ teams: result.data }) )
            this.setState({ teams: result.data })
          }
        }
      })

      const getPositions = axios.get('/api/positions')
      .then((result) => {
        if(result.status === 200) {
          if (this.state.isLoading) { 
            store.dispatch( saveAllPlayerPositions({ positions: result.data }) )
            this.setState({ positions: result.data })
          }
        }
      })

      Promise.all([getTeams]).then(
        () =>  store.dispatch(togglePageLoad({ pageLoading: false }))
      )
  }

  componentWillUnmount() {
    this.state.isLoading = false
    store.dispatch(togglePageLoad({ pageLoading: true }))
  }
  
  handleChange(e){
   this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.isHidden = true
    const { first_name, last_name, team_id, user_id, primary_position_id, bats, throws } = this.state

    axios.post('/api/players', { first_name, last_name, team_id, user_id, primary_position_id, bats, throws })
      .then((result) => {
        if(result.status === 200) {
          this.toggleHidden()
        }
      })
    this.isHidden = false
  }

  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

render() {
  const { selectedOption } = this.state

  const teamOptions = this.props.teams.map(function(row){
    return { value: row.id, label: row.city + ' ' + row.name}
  })

  const positionOptions = this.props.positions.map(function(row){
    return { value: row.id, label: row.abbreviation + ' - ' + row.name}
  })

  return (
      <div className="container mx-auto">
        <h1>Create Player</h1>
        {! this.state.isHidden && <AddedAlert />}
        { (! this.props.teams || this.props.teams.length === 0) && (
          <div>You must <Link to="/teams/add">add a team</Link> before creating players.</div>
        )}
         
         { this.props.teams.length > 0 && (
            <form className="w-full max-w-xs" onSubmit={this.handleSubmit}>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-first-name">
                    First Name
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input className="bg-grey-light appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-grey" id="inline-first-name" type="text" name="first_name" onChange={this.handleChange}/>
                </div>
              </div>

              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-last-name">
                    Last Name
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input className="bg-grey-light appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-grey" id="inline-last-name" type="text" name="last_name" onChange={this.handleChange}/>
                </div>
              </div>

              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-team">
                    Team
                  </label>
                </div>
                <div className="md:w-2/3">
                  <ScSelect name="team_id" value={ selectedOption } onChange={ this.handleChange.bind(this) } options={ teamOptions } />
                </div>
              </div>

              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-bats">
                    Primary Position
                  </label>
                </div>
                <div className="md:w-2/3">
                  <ScSelect name="primary_position_id" value={ selectedOption } onChange={ this.handleChange.bind(this) } options={ positionOptions } />
                </div>
              </div>

              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-bats">
                    Bats
                  </label>
                </div>
                <div className="md:w-2/3">
                  <ScSelect name="bats" value={ selectedOption } onChange={ this.handleChange.bind(this) } options={ batsOptions } />
                </div>
              </div>

              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-throws">
                    Throws
                  </label>
                </div>
                <div className="md:w-2/3">
                  <ScSelect name="throws" value={ selectedOption } onChange={ this.handleChange.bind(this) } options={ throwsOptions } />
                </div>
              </div>

              <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                  <input className="bg-green-darker hover:bg-green text-white font-bold py-2 px-4 rounded" type="submit" name="submit" value="Add"/>
                </div>
              </div>
            </form>
          )}
        </div>
    )
  }
}  

const AddedAlert = () => (
    <div className="flex mb-6">
      <div className="flex-initial border-2 border-green bg-yellow-lighter text-green-dark py-2 px-4 font-semibold rounded">
          A new player has been added
      </div>
    </div>
)

export default connect(mapStateToProps)(PlayersAdd)
