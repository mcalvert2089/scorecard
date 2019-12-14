import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from "react-redux"
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import { togglePageLoad, saveScorecards } from '../../../actions/index'
import axios from 'axios'

const mapStateToProps = (state) => ({ 
  scorecards: state.scorecards,
  user: state.user
})

class HomeScorecard extends Component {
	constructor(props) {
	    super(props);
	    this.state = { 
	      scorecards: []
	    }
	  }

	componentDidMount() {
		const getTeams = axios.get('/api/scorecard')
			.then((result) => {
			if(result.status === 200) {
				store.dispatch( saveScorecards({ scorecards: result.data }) )
				this.setState({ scorecards: result.data })
			}
		})

		Promise.all([getTeams]).then(
			() =>  store.dispatch(togglePageLoad({ pageLoading: false }))
		)
	}

	componentWillUnmount() {
 	   store.dispatch(togglePageLoad({ pageLoading: true }))
  	}

	render() {
		const { scorecards } = this.props

		return (
			<div>
				{ this.state.scorecards !== null && this.state.scorecards.length > 0 && (
					<table>
						<thead>
							<tr>
								<th>Date</th>
								<th>Start Time</th>
								<th>Home Team</th>
								<th>Visiting Team</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{ this.state.scorecards.map(data => {
							    const { id, game_date, start_time, home_team, visiting_team, active } = data;
							    return (
							      <tr key={id}>
							      	<td>{game_date}</td>
							        <td>{start_time}</td>
							        <td>{home_team.name}</td>
							        <td>{visiting_team.name}</td>
							        { 
							        	active 
							        		? <td><Link to={'/scorecard/' + id}><i className="fas fa-eye"></i></Link></td>
							        		: <td><Link to={'/scorecard/rosters/' + data.id }><i className="far fa-edit"></i></Link></td>
							        }
							      </tr>
							    )
							  })}			   
						</tbody>
					</table>
				)}
				<div className="md:flex md:items-center">
					<Link to="/scorecard/create" className="dark-button mt-3">Create Scorecard</Link>
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps)(HomeScorecard)