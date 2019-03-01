import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from "react-redux"
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import axios from 'axios'
import { togglePageLoad } from '../../../../js/actions/index'
import ScSelect from '../../form-elements/ScSelect'
import Roster from './Roster'
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
			home_dropdown: [],
			visiting_dropdown: [],
			positions_dropdown: [],
			active: 0,
			isHidden: true
	    }

	    this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleSaveRoster = this.handleSaveRoster.bind(this)
		this.saveScorecardRoster = this.saveScorecardRoster.bind(this)
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
						
						const home_scorecard_roster = result.data.home_scorecard_roster.map(function(row) {
							return {
								id: row.id,
								player_id: row.player_info.player_id,
								team_id: row.player_info.team_id,
								name_use: row.player_info.name_use,
								name_last: row.player_info.name_last,
								position: (row.position) ? row.position : row.player_info.primary_position,
								position_txt: row.player_info.position_txt							}
						})
						const visiting_scorecard_roster = result.data.visiting_scorecard_roster.map(function(row) {
							return {
								id: row.id,
								player_id: row.player_info.player_id,
								team_id: row.player_info.team_id,
								name_use: row.player_info.name_use,
								name_last: row.player_info.name_last,
								position: (row.position) ? row.position : row.player_info.primary_position,
								position_txt: row.player_info.position_txt							}
						})

					    this.setState({ 
					    	home_roster: result.data.home_roster,
					    	visiting_roster: result.data.visiting_roster,
					    	home_scorecard: home_scorecard_roster,
					    	visiting_scorecard: visiting_scorecard_roster,
					    	home_dropdown: home_dropdown, 
					    	visiting_dropdown: visiting_dropdown 
					    })
					}
				})

		const getPositions = axios.get('/api/positions')
				.then((result) => {
					if(result.status === 200) {
						let positions_dropdown = result.data.map(function(row) {
												return { value: row.position_id, label: row.position_txt }
											})

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
		this.state.isLoading = false
		store.dispatch(togglePageLoad({ pageLoading: true }))
	}

	handleChange(e, type){
		let roster = (e.target.name === 'home_scorecard') ? this.state.home_roster : this.state.visiting_roster

		let index = roster.findIndex(row => row.id === e.target.value)
		let player = roster[index]	
		player.position = player.primary_position

		// TO-DO: figure out a better way to do this (DRY)
		if((e.target.name === 'home_scorecard')) {
			this.setState((state) => {
		      const home_scorecard = state.home_scorecard.concat(player)

		      return {
		        home_scorecard
		      }
		    })	
		} else {
			this.setState((state) => {
		      const visiting_scorecard = state.visiting_scorecard.concat(player)

		      return {
		        visiting_scorecard
		      }
		    })
		}
	}

	updateRosterPosition(player_id, event) {
		let homeIndex = this.state.home_scorecard.findIndex(row => row.player_id === player_id)
		let visitingIndex = this.state.visiting_scorecard.findIndex(row => row.player_id === player_id)
		
		if(homeIndex !== -1) {
			const clone_state = this.state.home_scorecard.slice()
			clone_state[homeIndex].position = event.target.value
			this.setState({ home_scorecard: clone_state})
		}

		if(visitingIndex !== -1) {
			const clone_state = this.state.visiting_scorecard.slice()
			clone_state[visitingIndex].position = event.target.value
			this.setState({ visiting_scorecard: clone_state})
		}
	}

	async handleSubmit(event) {
		event.preventDefault()
		await this.setState({ active: 1 })
		this.saveScorecardRoster(true)
	}

	handleSaveRoster(event) {
		event.preventDefault()
		this.saveScorecardRoster(false)
	}

	saveScorecardRoster(redirect) {
		let home = []
		let visiting = []
		let payload = []

		const { id, home_scorecard, visiting_scorecard, active } = this.state
		console.log(home_scorecard)
		home_scorecard.forEach(function(row, index){
			let item = {}

			item['scorecard_id'] = this.state.id
			item['team_id'] = row.team_id
			item['player_id'] = row.player_id
			item['position'] = row.position
			item['batting_order'] = index + 1

			home.push(item)
		}.bind(this))

		visiting_scorecard.forEach(function(row, index){
			let item = {}

			item['scorecard_id'] = this.state.id
			item['team_id'] = row.team_id
			item['player_id'] = row.player_id
			item['position'] = row.position
			item['batting_order'] = index + 1

			visiting.push(item)
		}.bind(this))

		axios.post('/api/roster', { scorecard_id: this.state.id, active: active, scorecard_roster_home: home, scorecard_roster_visiting: visiting })
	        .then((result) => {
	          if(result.status === 200) {
	            if(redirect) this.props.history.push('/scorecard/' + this.state.id)
	          }
	        })
	}

	render() {
		return (
			<div>
				<form className="w-full" onSubmit={this.handleSubmit}>
					<div className="md:flex md:items-center mb-6">
						<div className="md:w-1/3">
						  <label htmlFor="inline-home-roster">
						    Add to Home Roster
						  </label>
						</div>
						<div className="md:w-2/3">
							<ScSelect name="home_scorecard" onChange={ this.handleChange.bind(this) } options={ this.state.home_dropdown } />
				    	</div>
					</div>
					<div className="md:flex md:items-center mb-6">
						{ this.state.home_scorecard.length === 0  && ( <span>No home roster yet.</span> ) }
						{ this.state.home_scorecard.length > 0 &&  <Roster players={ this.state.home_scorecard } positions_dropdown={ this.state.positions_dropdown } action={ this.updateRosterPosition.bind(this) } />}
					</div>

					<div className="md:flex md:items-center mb-6">
						<div className="md:w-1/3">
						  <label htmlFor="inline-visiting-roster">
						    Add to Visiting Roster
						  </label>
						</div>
						<div className="md:w-2/3">
							<ScSelect name="visiting_scorecard" onChange={ this.handleChange.bind(this) } options={ this.state.visiting_dropdown } />
				    	</div>
					</div>

					<div className="md:flex md:items-center mb-6">
						{ this.state.visiting_scorecard.length === 0  && ( <span>No visiting roster yet.</span> ) }
						{ this.state.visiting_scorecard.length > 0 &&  <Roster players={ this.state.visiting_scorecard } positions_dropdown={ this.state.positions_dropdown } action={ this.updateRosterPosition.bind(this) }  />}
					</div>
					<div className="md:flex md:items-center">
						<div className="md:w-1/3"></div>
						<div className="md:w-2/3">
							<input className="light-button mr-3" type="submit" name="submit" value="Save Roster" onClick={ this.handleSaveRoster.bind(this) } />
							<input className="dark-button" type="submit" name="submit" value="Start Scoring!" />
						</div>
					</div>
				</form>
			</div>
		)
	}
}

// function Roster(players) {
// 	if(players.players.length === 0) {
// 		return ( <div>No players yet.</div> )
// 	} else {
// 		return (
// 			<ol>
// 				{ players.players.map(data => {
// 					const { id, name_use, name_last, primary_position, position_txt } = data;
// 					return (
// 					  <li key={id}>
// 					  	{name_use} {name_last} ({ position_txt }) 
// 					  </li>
// 					)
// 				})}			   
// 			</ol>
// 		)
// 	}
// }
export default CreateScorecardRosters