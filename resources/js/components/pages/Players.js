import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from "react-redux"
import axios from 'axios'
import { togglePageLoad, saveAllPlayers } from '../../../js/actions/index'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

const addStyle = {
  fontSize: '16px',
  paddingRight: '6px'
}

const mapStateToProps = state => ({
	players: state.players
})

class Players extends React.Component {
	constructor(props) {
    	super(props)

	    this.state = {
			players: null,
			isLoading: true
		}
	}

	componentDidMount() {
		this.state.isLoading = true

		const getPlayers = axios.get('/api/players')
	    .then((result) => {
	      if(result.status === 200) {
	      	if (this.state.isLoading) { 
	      		store.dispatch( saveAllPlayers({ players: result.data }) )
	      		this.setState({ players: result.data })
	      	}
	      }
	    })

	    Promise.all([getPlayers]).then(
			() =>  store.dispatch(togglePageLoad({ pageLoading: false }))
		)
	}

	componentWillUnmount() {
		this.state.isLoading = false
		store.dispatch(togglePageLoad({ pageLoading: true }))
	}

	render() {
		const { players } = this.props

		return (
			<div>
				<h2>Players</h2>
			    { this.state.players === null && <div>Loading Players...</div> }
		    	{ this.state.players !== null && <PlayerList players={ players } /> }

			    <div className="mt-6">
				    <Link to='/players/add' className="bg-green-darker hover:bg-green text-white font-bold py-2 px-4 rounded">
				    	<i className="fas fa-plus" style={addStyle}></i>
				    	Add Player
				    </Link>
				</div>
		  </div>
		)
	}
}

function PlayerList(players) {
	if(players.players.length === 0) {
		return ( <div>No players yet.</div> )
	} else {
		return (
			<table>
				<thead>
					<tr>
						<th>Last Name</th>
						<th>First Name</th>
						<th>Team</th>
						<th>
							<span className="hideOnMobile">Primary </span>Position
						</th>
						<th className="hideOnMobile">Bats</th>
						<th className="hideOnMobile">Throws</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{ players.players.map(data => {
				    const { id, first_name, last_name, position, team, bats, throws } = data;
				    return (
				      <tr key={id}>
				      	<td>{last_name}</td>
				        <td>{first_name}</td>
				        <td>
				        	<span className="hideOnMobile">{team.city} </span>{team.name}</td>
				        <td>
				        	<span className="hideOnMobile">{position.name}</span>
				        	<span className="mobileOnly">{position.abbreviation}</span>
				       	</td>
				        <td className="hideOnMobile">{bats}</td>
				        <td className="hideOnMobile">{throws}</td>
				        <td>
				        	<Link to={ '/players/edit/' +  id }>
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

export default connect(mapStateToProps)(Players)