import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from "react-redux"
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import axios from 'axios'
import { togglePageLoad, saveAllTeams, saveAllPlayerPositions } from '../../../../js/actions/index'
import ScSelect from '../../form-elements/ScSelect'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { validate } from '../../form-elements/validation'

const mapStateToProps = (state) => ({ 
  teams: state.teams,
  user: state.user,
  positions: state.positions
})

class CreateScorecard extends Component {
	constructor(props) {
		super(props);
		this.state = { 
		  home_team_id: '',
		  visiting_team_id: '',
		  game_date: new Date(),
		  start_time_hour: '',
		  start_time_minutes: '',
		  start_time_meridian: '',
		  errors: []
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleDateChange = this.handleDateChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentDidMount() {
		const getTeams = axios.get('/api/teams')
		  .then((result) => {
		    if(result.status === 200) {
		        store.dispatch( saveAllTeams({ teams: result.data }) )
		        this.setState({ teams: result.data })
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

	handleDateChange(date){
		this.setState({ game_date: date })
	}

	handleSubmit(event) {
		event.preventDefault()
		let valid = validate([ { 
						name: 'Home Team',
						field_name: 'home_team_id',
						rules: 'required',
						value: this.state.home_team_id
					},
					{ 
						name: 'Visiting Team',
						field_name: 'visiting_team_id',
						rules: 'required',
						value: this.state.visiting_team_id
					},
					{ 
						name: 'Game Date',
						field_name: 'game_date',
						rules: 'required',
						value: (this.state.game_date) ? this.state.game_date.toString() : ''
					},
					{ 
						name: 'Start Time',
						custom_field_name: 'start_time',
						rules: 'scorecard_start_time',
						value: {
									hour: this.state.start_time_hour, 
									minutes: this.state.start_time_minutes,
									meridian: this.state.start_time_meridian 
								}
					},
				])

		this.setState({ errors: valid })

		if(Object.keys(valid).length === 0) {
			const { home_team_id, visiting_team_id, game_date, start_time_hour, start_time_minutes, start_time_meridian } = this.state
			let start_time = start_time_hour + ':' + start_time_minutes + ' ' + start_time_meridian
			
			axios.post('/api/scorecard', { home_team_id, visiting_team_id, game_date, start_time })
		      .then((result) => {
		        if(result.status === 200) {
		        	console.log(result)
		        }
		      })
		}
	}

  render() {
	const teamOptions = this.props.teams.map(function(row){
		return { value: row.id, label: row.city + ' ' + row.name}
	})

	const positionOptions = this.props.positions.map(function(row){
		return { value: row.id, label: row.abbreviation + ' - ' + row.name}
	})

	const meridianOptions = [
		{ value: 'AM', label: 'AM'},
		{ value: 'PM', label: 'PM'},
	]

  	return (
  		<div>
			<form className="w-full" onSubmit={this.handleSubmit}>
				<div className="md:flex md:items-center mb-6">
					<div className="md:w-1/3">
					  <label htmlFor="inline-home-team">
					    Home Team
					  </label>
					</div>
					<div className="md:w-2/3">
					  	<ScSelect name="home_team_id" onChange={ this.handleChange.bind(this) } options={ teamOptions } />
						{ this.state.errors.home_team_id && ( <div className="error">{ this.state.errors.home_team_id }</div> ) }
			    	</div>
				</div>

				<div className="md:flex md:items-center mb-6">
					<div className="md:w-1/3">
					  <label htmlFor="inline-visiting-team">
					    Visiting Team
					  </label>
					</div>
					<div className="md:w-2/3">
					  	<ScSelect name="visiting_team_id" onChange={ this.handleChange.bind(this) } options={ teamOptions } />
						{ this.state.errors.visiting_team_id && ( <div className="error">{ this.state.errors.visiting_team_id }</div> ) }
			    	</div>
				</div>
				
				<div className="md:flex md:items-center mb-6">
					<div className="md:w-1/3">
					  <label htmlFor="inline-game-date">
					    Game Date
					  </label>
					</div>
					<div className="md:w-2/3">
						<DatePicker selected={this.state.game_date} onChange={this.handleDateChange} />				
						{ this.state.errors.game_date && ( <div className="error">{ this.state.errors.game_date }</div> ) }
					</div>
				</div>
				
				<div className="md:flex md:items-center mb-6">
					<div className="md:w-1/3">
						<label htmlFor="inline-start-hour">
						Start Time
						</label>
					</div>
					<div className="md:w-2/3">
						<div className="flex mb-4">
							<div className="w-1/3">
								<input placeholder="12" maxLength="2" className="text-field" id="inline-start-hour" type="text" name="start_time_hour" onChange={this.handleChange}/>
							</div>
							<div className="w-1/3">
								<input placeholder="00" maxLength="2" className="text-field" id="inline-start-minutes" type="text" name="start_time_minutes" onChange={this.handleChange}/>
							</div>
							<div className="w-1/3">
								<ScSelect name="start_time_meridian" onChange={ this.handleChange.bind(this) } options={ meridianOptions } />
							</div>
						</div>
						{ this.state.errors.start_time && ( <div className="error">{ this.state.errors.start_time }</div> ) }
					</div>
				</div>

				<div className="md:flex md:items-center">
					<div className="md:w-1/3"></div>
					<div className="md:w-2/3">
						<input className="dark-button" type="submit" name="submit" value="Create Scorecard"/>
					</div>
				</div>
			</form>
		</div>
  	)
  }
 }

 export default connect(mapStateToProps)(CreateScorecard)