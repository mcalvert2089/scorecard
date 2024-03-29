import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {connect} from "react-redux"
import axios from 'axios'
import { togglePageLoad, saveSinglePlayer, saveAllTeams, saveAllPlayerPositions, updatePlayerInfo } from '../../../js/actions/index'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import ScSelect from '../form-elements/ScSelect'

const mapStateToProps = (state) => ({ 
  teams: state.teams,
  user: state.user,
  positions: state.positions
})

const addStyle = {
  fontSize: '16px',
  paddingRight: '6px'
}

const batsOptions = [
  { value: '', label: '' },
  { value: 'R', label: 'Right' },
  { value: 'L', label: 'Left' },
  { value: 'S', label: 'Switch' }
]

const throwsOptions = [
	{ value: '', label: '' },
    { value: 'R', label: 'Right' },
    { value: 'L', label: 'Left' }
]

class PlayersEdit extends Component {
	  constructor(props) {
	    super(props)
	    this.state = { 
			id: props.match.params.id,
			first_name: '',
			last_name: '',
			team_id: '',
			team_name: '',
			user_id: '',
			primary_position_id: '',
			primary_position_name: '',
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

		const getPlayers = axios.get('/api/players/' + this.state.id)
			.then((result) => {
			  if(result.status === 200) {
			  	if (this.state.isLoading) { 
			  		this.setState({ 
			      		id: (result.data.id) ? result.data.id : '',
			      		first_name: (result.data.first_name) ? result.data.first_name : '',
			      		last_name: (result.data.last_name) ? result.data.last_name : '',
			      		team_id: (result.data.team_id) ? result.data.team_id : '',
				      	team_name: (result.data.team.name) ? result.data.team.city + ' ' + result.data.team.name : '',
			      		primary_position_id: (result.data.primary_position_id) ? result.data.primary_position_id : '',
			  			primary_position_name: (result.data.position.abbreviation) ? result.data.position.abbreviation + ' - ' + result.data.position.name : '',
			      		bats: (result.data.bats) ? result.data.bats : '',
			      		throws: (result.data.throws) ? result.data.throws : ''
			      	})
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

		Promise.all([getTeams, getPlayers, getPositions]).then(
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
	    this.setState({ isHidden: true })

	    const { id, first_name, last_name, team_id, primary_position_id, bats, throws } = this.state;

	    axios.patch('/api/players/' + this.state.id, { id, first_name, last_name, team_id,  primary_position_id, bats, throws })
	      .then((result) => {
	        if(result.status === 200) {
	        	let data = {
	        			id: (result.data.id) ? result.data.id : '',
	        			first_name: (result.data.first_name) ? result.data.first_name : '',
			      		last_name: (result.data.last_name) ? result.data.last_name : '',
			      		team_id: (result.data.team_id) ? result.data.team_id : '',
	      				primary_position_id: (result.data.primary_position_id) ? result.data.primary_position_id : '',
			      		bats: (result.data.bats) ? result.data.bats : '',
			      		throws: (result.data.throws) ? result.data.throws : ''
	        		}

	      		store.dispatch( saveSinglePlayer({ player: data }) )

				this.setState({ data }) 
	        }
	      })
	 
	  }

	render() {
		const { id, first_name, last_name, team_id, primary_position_id, bats, throws } = this.state

		const teamOptions = this.props.teams.map(function(row){
			return { value: row.id, label: row.city + ' ' + row.name}
		})

		const positionOptions = this.props.positions.map(function(row){
			return { value: row.id, label: row.abbreviation + ' - ' + row.name}
		})

		return (
		  <div className="container mx-auto">
		  	  <h1>Edit Player</h1>
			  {! this.state.isHidden && <EditedAlert />}
			  <form className="w-full max-w-xs" onSubmit={this.handleSubmit}>
			  <div className="md:flex md:items-center mb-6">
			    <div className="md:w-1/3">
			      <label htmlFor="inline-first-name">
			        First Name
			      </label>
			    </div>
			    <div className="md:w-2/3">
			      <input className="text-field" id="inline-first-name" type="text" name="first_name" value={this.state.first_name} onChange={this.handleChange}/>
			    </div>
			  </div>

			  <div className="md:flex md:items-center mb-6">
			    <div className="md:w-1/3">
			      <label htmlFor="inline-last-name">
			        Last Name
			      </label>
			    </div>
			    <div className="md:w-2/3">
			      <input className="text-field" id="inline-last-name" type="text" name="last_name" value={this.state.last_name} onChange={this.handleChange}/>
			    </div>
			  </div>

			   <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label htmlFor="inline-team">
                    Team
                  </label>
                </div>
                <div className="md:w-2/3">
                  <ScSelect name="team_id" value={ this.state.team_id } onChange={ this.handleChange.bind(this) } options={ teamOptions } />
                </div>
              </div>

              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label htmlFor="inline-team">
                    Primary Position
                  </label>
                </div>
                <div className="md:w-2/3">
                  <ScSelect name="primary_position_id" value={ this.state.primary_position_id } onChange={ this.handleChange.bind(this) } options={ positionOptions } />
                </div>
              </div>

              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label htmlFor="inline-team">
                    Bats
                  </label>
                </div>
                <div className="md:w-2/3">
                  <ScSelect name="bats" value={ this.state.bats } onChange={ this.handleChange.bind(this) } options={ batsOptions } />
                </div>
              </div>

              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label htmlFor="inline-team">
                    Throws
                  </label>
                </div>
                <div className="md:w-2/3">
                  <ScSelect name="throws" value={ this.state.throws } onChange={ this.handleChange.bind(this) } options={ throwsOptions } />
                </div>
              </div>

              <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                  <input className="dark-button" type="submit" name="submit" value="Submit"/>
                </div>
              </div>
			</form>
			</div>
		) 
	}
}

const EditedAlert = () => (
    <div className="flex mb-6">
      <div className="flex-initial border-2 border-green bg-yellow-lighter text-green-dark py-2 px-4 font-semibold rounded">
          Team has been updated
      </div>
    </div>
)

export default connect(mapStateToProps)(PlayersEdit)
