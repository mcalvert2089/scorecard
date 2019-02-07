import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from "react-redux"
import axios from 'axios'
import { togglePageLoad, saveAllTeams } from '../../../js/actions/index'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

const addStyle = {
  fontSize: '16px',
  paddingRight: '6px'
};

const mapStateToProps = state => ({
	teams: state.teams
})

class Teams extends React.Component {

  constructor(props) {
    super(props)
	    this.state = {
			teams: null,
			isLoading: true
		}
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

	    Promise.all([getTeams]).then(
			() =>  store.dispatch(togglePageLoad({ pageLoading: false }))
		)
	}

	componentWillUnmount() {
		this.state.isLoading = false
		store.dispatch(togglePageLoad({ pageLoading: true }))
	}
	
	render() {	
		const { teams } = this.props

		return (
		  <div>
		    <h2>Teams</h2>

		    { this.state.teams === null && <div>Loading Teams...</div> }
		    { this.state.teams !== null && <TeamList teams={ teams } /> }

		    <div className="mt-6">
			    <Link to='/teams/add' className="dark-button">
			    	<i className="fas fa-plus" style={ addStyle }></i>
			    	Add Team
			    </Link>
			</div>
		  </div>
		) 
	}
}

function TeamList(teams) {
		if(teams.teams.length === 0) {
			return ( <div>No teams yet.</div> )
		} else {
			return (
				<table>
					<thead>
						<tr>
							<th>Team Name</th>
							<th>Manager</th>
							<th>City</th>
							<th>State</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{ teams.teams.map(data => {
					    const { id, name, city, state, manager } = data;
					    return (
					      <tr key={id}>
					        <td>{name}</td>
					        <td>{manager}</td>
					        <td>{city}</td>
					        <td>{state}</td>
					        <td>
					        	<Link to={ '/teams/edit/' +  id }>
					        		<i className="fas fa-edit"></i>
					        	</Link>
					        </td>
					      </tr>
					    )
					  })}			   
					</tbody>
				</table>
			)
		}
}

export default connect(mapStateToProps)(Teams);