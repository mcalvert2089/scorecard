import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from "react-redux"
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import axios from 'axios'
import { togglePageLoad } from '../../../../js/actions/index'
import ScSelect from '../../form-elements/ScSelect'
import Roster from './Roster'
import Loading from '../../Loading'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { validate } from '../../form-elements/validation'

const mapStateToProps = (state) => ({ 
  teams: state.teams,
  user: state.user,
  positions: state.positions
})

class CreateScorecardRosters extends Component {
	constructor(props) {
	    super(props)
	    this.state = { 
			id: props.match.params.id,
			home_roster: [],
			visiting_roster: [],
			home_scorecard: [],
			visiting_scorecard: [],
			home_starting_pitcher: [],
			visiting_starting_pitcher: [],
			home_dropdown: [],
			visiting_dropdown: [],
			positions_dropdown: [],			
			home_pitchers_dropdown: [],
			visiting_pitchers_dropdown: [],
			active: 0,
			errors: []
	    }

	    this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleSaveRoster = this.handleSaveRoster.bind(this)
		this.saveScorecardRoster = this.saveScorecardRoster.bind(this)
		this.handlePitcherChange = this.handlePitcherChange.bind(this)
	  }

	componentDidMount() {
		const getRosters = axios.get('/api/scorecard-rosters/' + this.state.id)
				.then((result) => {
					if(result.status === 200) {
						const home_dropdown = result.data.home_roster.map(function(row) {
												return { value: row.id, label: row.name_last +', ' + row.name_use + ' - ' + row.position_txt }
											})

						const visiting_dropdown = result.data.visiting_roster.map(function(row){
												return { value: row.id, label: row.name_last +', ' + row.name_use  + ' - ' + row.position_txt }
											})
						
						const home_scorecard_roster = result.data.home_scorecard_roster.map(function(row, index) {
							return this.convertPlayerDataForScorecard(row, 'home_scorecard', index)
						}.bind(this))

						const visiting_scorecard_roster = result.data.visiting_scorecard_roster.map(function(row, index) {
							return this.convertPlayerDataForScorecard(row, 'visiting_scorecard', index)
						}.bind(this))

						const home_pitchers_dropdown = result.data.home_roster.map(function (row, index) {
							return (row.primary_position === '1') ? { value: row.player_id, label: row.name_last +', ' + row.name_use } : null
						}.bind(this)).filter(row => row)

						const visiting_pitchers_dropdown = result.data.visiting_roster.map(function (row, index) {
							return (row.primary_position === '1') ? { value: row.player_id, label: row.name_last +', ' + row.name_use } : null
						}.bind(this)).filter(row => row)

					    this.setState({ 
					    	home_roster: result.data.home_roster,
					    	visiting_roster: result.data.visiting_roster,
					    	home_scorecard: home_scorecard_roster,
					    	visiting_scorecard: visiting_scorecard_roster,
					    	home_dropdown: home_dropdown, 
					    	visiting_dropdown: visiting_dropdown,
					    	home_pitchers_dropdown: home_pitchers_dropdown,
					    	visiting_pitchers_dropdown: visiting_pitchers_dropdown,
					    	home_starting_pitcher: (typeof result.data.home_pitchers[0] != 'undefined') ? result.data.home_pitchers[0] : [],
					    	visiting_starting_pitcher: (typeof result.data.visiting_pitchers[0] != 'undefined') ? result.data.visiting_pitchers[0] : []
					    })
					}
				})

		const getPositions = axios.get('/api/positions')
				.then((result) => {
					if(result.status === 200) {
						let positions_dropdown = result.data.map(function(row) { return { value: row.position_id, label: row.position_txt } })

					    this.setState({ 
					    	positions_dropdown: positions_dropdown,
					    })
					}
				})

		Promise.all([getRosters, getPositions]).then(
			() =>  store.dispatch(togglePageLoad({ pageLoading: false }))
		)
	}

	componentWillUnmount() {
		store.dispatch(togglePageLoad({ pageLoading: true }))
	}

	handleChange(e) {
		let key = e.target.name
		let data = []
		const roster = (e.target.name === 'home_scorecard') ? this.state.home_roster.slice() : this.state.visiting_roster.slice()
		const index = roster.findIndex(row => row.id === e.target.value)
		const player = { id: roster[index].id, player_info: roster[index] }
		
		const player_scorecard = this.convertPlayerDataForScorecard(player, key, this.state[key].length)
		data = this.state[key].concat(player_scorecard)

		if(key && data) this.setState({ [key]:  data })
	}

	handlePitcherChange(e) {
		const roster = (e.target.name === 'home_starting_pitcher') ? this.state.home_roster.slice() : this.state.visiting_roster.slice()
		const index = roster.findIndex(row => row.player_id === e.target.value * 1)
		let pitcher = (typeof roster[index] !== 'undefined') ? roster[index] : []

		if(e.target.name === 'home_starting_pitcher') this.setState({ home_starting_pitcher: pitcher })
		if(e.target.name === 'visiting_starting_pitcher') this.setState({ visiting_starting_pitcher: pitcher })
	}


	updateRosterPosition(type, player_id, event) {
		const value = event.target.value
		const index = this.state[type].findIndex(row => row.player_id === player_id)
		let clone_state = this.state[type].slice()
		const position_data = this.state.positions_dropdown.find(row => row.value === value)

		clone_state[index].position = value
		clone_state[index].position_txt = position_data.label

		if(type && index !== -1) this.setState({ [type]: clone_state})
	}

	async handleSubmit(event) {
		event.preventDefault()
		
		await this.setState({ active: 1 })
		this.saveScorecardRoster(true)
	}

	handleSaveRoster(event) {
		event.preventDefault()

		let valid = validate([ { 
						name: 'Home team positions',
						field_name: 'home_team_positions',
						rules: 'no_duplicates',
						value: this.state.home_scorecard
					},
					{ 
						name: 'Visiting team positions',
						field_name: 'visiting_team_positions',
						rules: 'no_duplicates',
						value: this.state.visiting_scorecard
					}
		])

		if(Object.keys(valid).length > 0) this.setState({ errors: valid })
		if(Object.keys(valid).length === 0) {
			this.saveScorecardRoster(false)
		}
	}

	saveScorecardRoster(redirect) {
		document.getElementById("overlay").style.display = "block";
  
		const { id, home_scorecard, visiting_scorecard, home_starting_pitcher, visiting_starting_pitcher,  active } = this.state

		axios.post('/api/roster', { 
					scorecard_id: this.state.id, 
					active: active, 
					scorecard_roster_home: home_scorecard, 
					scorecard_roster_visiting: visiting_scorecard,
					home_starting_pitcher: home_starting_pitcher,
					visiting_starting_pitcher: visiting_starting_pitcher 
				})
	        .then((result) => {
	          if(result.status === 200) {
	          	document.getElementById("overlay").style.display = "none";
	            if(redirect) this.props.history.push('/scorecard/' + this.state.id)
	          }
	        })
	}

	convertPlayerDataForScorecard(row, key, index) {
		return {
			id: row.id,
			player_id: row.player_info.player_id,
			team_id: (row.team_id) ? row.team_id : row.player_info.team_id,
			name_use: row.player_info.name_use,
			name_last: row.player_info.name_last,
			position: (typeof row.position_info !== 'undefined' && typeof row.position_info.position_id !== 'undefined') ? row.position_info.position_id : row.player_info.primary_position,
			position_txt: (typeof row.position_info !== 'undefined' && typeof row.position_info.position_txt !== 'undefined') ? row.position_info.position_txt : row.player_info.position_txt,
			batting_order: index + 1
		}
	}

	render() {
		return (
			<div>
				<form className="w-full" onSubmit={this.handleSubmit}>
					<h2>Home Team</h2>
					<div className="md:flex md:items-center mb-6">
						<div className="md:w-1/3">
						  <label htmlFor="inline-visiting-roster">
						    Starting Pitcher
						  </label>
						</div>
						<div className="md:w-2/3">
							<ScSelect 
								name="home_starting_pitcher" 
								value={ this.state.home_starting_pitcher.player_id } 
								onChange={ this.handlePitcherChange.bind(this) } 
								options={ this.state.home_pitchers_dropdown } 
							/>
				    	</div>
					</div>
					<div className="md:flex md:items-center mb-6">
						<div className="md:w-1/3">
						  <label htmlFor="inline-home-roster">
						    Add to Roster
						  </label>
						</div>
						<div className="md:w-2/3">
							<ScSelect 
								name="home_scorecard" 
								onChange={ this.handleChange.bind(this) } 
								options={ this.state.home_dropdown } 
								disabled={ this.state.home_scorecard.length === 9 }
							 />
				    	</div>
					</div>
					{ (this.state.home_scorecard.length === 9)  &&  <RosterFullAlert /> }
					<div className="md:flex md:items-center mb-6">
						{ this.state.home_scorecard.length > 0 &&  
								<Roster 
									type="home_scorecard" 
									players={ this.state.home_scorecard } 
									positions_dropdown={ this.state.positions_dropdown } 
									action={ this.updateRosterPosition.bind(this) } 
								/>}
					</div>
					{ this.state.errors.home_team_positions && ( <div className="error mb-4">{ this.state.errors.home_team_positions }</div> ) }
					<h2>Visiting Team</h2>
					<div className="md:flex md:items-center mb-6">
						<div className="md:w-1/3">
						  <label htmlFor="inline-visiting-roster">
						    Starting Pitcher
						  </label>
						</div>
						<div className="md:w-2/3">
							<ScSelect 
								name="visiting_starting_pitcher" 
								value={ this.state.visiting_starting_pitcher.player_id } 
								onChange={ this.handlePitcherChange.bind(this) } 
								options={ this.state.visiting_pitchers_dropdown } />
				    	</div>
					</div>
					<div className="md:flex md:items-center mb-6">
						<div className="md:w-1/3">
						  <label htmlFor="inline-visiting-roster">
						    Add to Roster
						  </label>
						</div>
						<div className="md:w-2/3">
							<ScSelect 
								name="visiting_scorecard" 
								onChange={ this.handleChange.bind(this) }
								options={ this.state.visiting_dropdown } 
								disabled={ this.state.visiting_scorecard.length === 9 } 
							/>
				    	</div>
					</div>
					{ (this.state.visiting_scorecard.length === 9) &&  <RosterFullAlert /> }

					<div className="md:flex md:items-center mb-6">
						{ this.state.visiting_scorecard.length > 0 &&  
								<Roster 
									type="visiting_scorecard" 
									players={ this.state.visiting_scorecard } 
									positions_dropdown={ this.state.positions_dropdown } 
									action={ this.updateRosterPosition.bind(this) }
								/>}
					</div>
					{ this.state.errors.visiting_team_positions && ( <div className="error mb-4">{ this.state.errors.visiting_team_positions }</div> ) }

					<div className="md:flex md:items-center">
						<div className="md:w-1/3"></div>
						<div className="md:w-2/3">
							<input className="light-button mr-3" type="submit" name="submit" value="Save Roster" onClick={ this.handleSaveRoster.bind(this) } />
							<input className="dark-button" type="submit" name="submit" value="Start Scoring!" />
						</div>
					</div>
				</form>
				<div id="overlay">
					<div id="overlay-saving">
						<Loading />
					</div>
				</div>
			</div>
		)
	}
}

function RosterFullAlert() {
		return ( <div className="md:flex md:items-center mb-6">
					<div className="md:w-1/3"></div>
					<div className="md:w-2/3 text-red text-sm">
						Roster is full.
					</div>
				</div> 
			)
}

export default CreateScorecardRosters