import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from "react-redux"
import axios from 'axios'
import ScSelect from '../../form-elements/ScSelect'
import { validate } from '../../form-elements/validation'

class Roster extends Component {
	constructor(props) {
	    super(props)
	  }

	  render() {
		if(this.props.players && this.props.positions_dropdown) {
			return (
				<ol>
					{ this.props.players.map(data => {
						const { id, name_use, name_last, player_id, position, position_txt } = data;
						return (
						  <li key={id}>
						  	{name_use} {name_last} 
							<ScSelect name="positions" onChange={ (e) => this.props.action(player_id, e) } selected={ position } options={ this.props.positions_dropdown } />
						  </li>
						)
					})}
				</ol>
			)
		}
		return ( <div>No players yet.</div> )
	  }
}

export default Roster