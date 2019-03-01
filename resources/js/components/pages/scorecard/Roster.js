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
				<ol className="roster-dropdown">
					{ this.props.players.map(data => {
						const { id, name_use, name_last, player_id, position, position_txt } = data;
						return (
						  <li key={id}>
						  	<div className="md:flex md:items-center mb-6">
						  		<div className="md:w-1/3">
						  			{name_use} {name_last} 
						  		</div>
						  		<div className="md:w-2/3">
									<ScSelect name="positions" onChange={ (e) => this.props.action(player_id, e) } selected={ position } options={ this.props.positions_dropdown } />
						  		</div>
						  	</div>
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