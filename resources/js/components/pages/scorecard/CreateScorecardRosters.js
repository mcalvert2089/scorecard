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
			isHidden: true
	    }

	    this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	  }

	componentDidMount() {
		const getRosters = axios.get('/api/scorecard-rosters/' + this.state.id)
							.then((result) => {
								if(result.status === 200) {
									let home_roster = result.data.home_roster.map(function(row) {
															return { value: row.id, label: row.position.abbreviation + ' - ' + row.last_name +', ' + row.first_name }
														})

									let visiting_roster = result.data.visiting_roster.map(function(row){
															return { value: row.id, label: row.position.abbreviation + ' - ' + row.last_name +', ' + row.first_name }
														})

								    this.setState({ 
								    	home_roster: home_roster,
								    	visiting_roster: visiting_roster
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

	handleChange(e){
		this.setState({ [e.target.name]: e.target.value })
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
					  <label htmlFor="inline-home-team">
					    Add to Home Roster
					  </label>
					</div>
					<div className="md:w-2/3">
						<ScSelect name="home_team_id" onChange={ this.handleChange.bind(this) } options={ this.state.home_roster } />
			    	</div>
				</div>

				<div className="md:flex md:items-center mb-6">
					<div className="md:w-1/3">
					  <label htmlFor="inline-home-team">
					    Add to Visiting Roster
					  </label>
					</div>
					<div className="md:w-2/3">
						<ScSelect name="home_team_id" onChange={ this.handleChange.bind(this) } options={ this.state.visiting_roster } />
			    	</div>
				</div>
			</div>
		)
	}
}

export default CreateScorecardRosters