import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from "react-redux"
import axios from 'axios'
import { saveAllTeams } from '../../../js/actions/index'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

const addStyle = {
  fontSize: '16px',
  paddingRight: '6px'
};

const mapStateToProps = state => ({
	teams: state.teams
})

class Teams extends React.Component {
	componentDidMount() {
		axios.get('/api/teams')
	    .then((result) => {
	      if(result.status === 200) {
	      	store.dispatch( saveAllTeams({ teams: result.data }) )
	      }
	    })
	}

	render() {
		const { teams } = this.props

		return (
		  <div>
		    <h2>Teams</h2>
		    <table>
		    	<thead>
		    		<tr>
		    			<th>Team Name</th>
		    			<th>Manager</th>
		    		</tr>
		    	</thead>
		    	<tbody>
	 				{ teams.map(data => {
				        const { id, name, city, state, manager } = data;
				        return (
				          <tr key={id}>
				            <td>{city} {name}</td>
				            <td>{manager}</td>
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

		    <div className="mt-6">
			    <Link to='/teams/add' className="bg-green-darker hover:bg-green text-white font-bold py-2 px-4 rounded">
			    	<i className="fas fa-plus" style={addStyle}></i>
			    	Add Team
			    </Link>
			</div>
		  </div>
		) 
	}
}

export default connect(mapStateToProps)(Teams);