import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from "react-redux"
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import axios from 'axios'
import { togglePageLoad } from '../../../../js/actions/index'
import ScSelect from '../../form-elements/ScSelect'
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
			isHidden: true
	    }

	    this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	  }

	componentDidMount() {
		const getRosters = axios.get('/api/scorecard-rosters/' + this.state.id)
							.then((result) => {
								if(result.status === 200) {
									let home_dropdown = result.data.home_roster.map(function(row) {
															return { value: row.id, label: row.position.abbreviation + ' - ' + row.last_name +', ' + row.first_name }
														})

									let visiting_dropdown = result.data.visiting_roster.map(function(row){
															return { value: row.id, label: row.position.abbreviation + ' - ' + row.last_name +', ' + row.first_name }
														})

								    this.setState({ 
								    	home_roster: result.data.home_roster,
								    	visiting_roster: result.data.visiting_roster,
								    	home_dropdown: home_dropdown, 
								    	visiting_dropdown: visiting_dropdown 
								    })
								}
							})

		Promise.all([getRosters]).then(
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

	handleDateChange(date){
		this.setState({ game_date: date })
	}

	handleSubmit(event) {
		event.preventDefault()
	}

	render() {
		return (
			<div>
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
					{ this.state.home_scorecard.length > 0 &&  <Roster players={this.state.home_scorecard} />}
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
					{ this.state.visiting_scorecard.length > 0 &&  <Roster players={this.state.visiting_scorecard} />}
				</div>
				<div className="md:flex md:items-center">
					<div className="md:w-1/3"></div>
					<div className="md:w-2/3">
						<input className="dark-button" type="submit" name="submit" value="Start Scoring!"/>
					</div>
				</div>
			</div>
		)
	}
}

function Roster(players) {
	if(players.players.length === 0) {
		return ( <div>No players yet.</div> )
	} else {
		return (
			<ol>
				{ players.players.map(data => {
			    const { id, first_name, last_name, position } = data;
			    return (
			      <li key={id}>
			      	{first_name} {last_name}
			      </li>
			    )
			  })}			   
			</ol>
		)
	}
}
export default CreateScorecardRosters