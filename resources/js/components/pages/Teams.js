import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

const addStyle = {
  fontSize: '16px',
  paddingRight: '6px'
};

export default class Teams extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			teams: []
		}
	}

	componentDidMount() {
		axios.get('/api/teams')
	    .then((result) => {
	      if(result.status === 200) {
	      	this.setState({ teams: result.data })
	      }
	    })
	}

	render() {
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
				    { this.state.teams.map(post => {
				        const { id, name, city, state, manager } = post;
				        return (
				          <tr key={id}>
				            <td>{city} {name}</td>
				            <td>{manager}</td>
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