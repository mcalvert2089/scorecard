import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {connect} from "react-redux"
import axios from 'axios'
import { saveSinglePlayer, saveAllTeams, saveAllPlayerPositions, updatePlayerInfo } from '../../../js/actions/index'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import Select from 'react-select'

const mapStateToProps = (state) => ({ 
  teams: state.teams,
  user: state.user,
  positions: state.positions
})

const addStyle = {
  fontSize: '16px',
  paddingRight: '6px'
}

const batsOptions = [
  { value: 'R', label: 'Right' },
  { value: 'L', label: 'Left' },
  { value: 'S', label: 'Switch' }
]

const throwsOptions = [
    { value: 'R', label: 'Right' },
    { value: 'L', label: 'Left' }
]

class PlayersEdit extends React.Component {
	  constructor(props) {
	    super(props);
	    this.state = { 
			id: props.match.params.id,
			first_name: '',
			last_name: '',
			team_id: '',
			user_id: '',
			primary_position_id: '',
			bats: '',
			throws: '',
			isHidden: true,
			isLoading: true
	    }

	    this.handleChange = this.handleChange.bind(this)
    	this.handleTeamDropdownChange = this.handleTeamDropdownChange.bind(this)
		this.handlePositionDropdownChange = this.handlePositionDropdownChange.bind(this)
		this.handleBatsDropdownChange = this.handleBatsDropdownChange.bind(this)
		this.handleThrowsDropdownChange = this.handleThrowsDropdownChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	  }

	componentDidMount() {
		this.state.isLoading = true
		 axios.get('/api/teams')
	      .then((result) => {
	        if(result.status === 200) {
	          if (this.state.isLoading) { 
	            store.dispatch( saveAllTeams({ teams: result.data }) )
	            this.setState({ teams: result.data })
	          }
	        }
	      })

		axios.get('/api/players/' + this.state.id)
	    .then((result) => {
	      if(result.status === 200) {
	      	if (this.state.isLoading) { 
	      		this.setState({ 
		      		id: (result.data.id) ? result.data.id : '',
		      		first_name: (result.data.first_name) ? result.data.first_name : '',
		      		last_name: (result.data.last_name) ? result.data.last_name : '',
		      		team_id: (result.data.team_id) ? result.data.team_id : '',
		      		primary_position_id: (result.data.primary_position_id) ? result.data.primary_position_id : '',
		      		bats: (result.data.bats) ? result.data.bats : '',
		      		throws: (result.data.throws) ? result.data.throws : ''
		      	})
		    }
	      }
	    })

	    axios.get('/api/positions')
	      .then((result) => {
	        if(result.status === 200) {
	          if (this.state.isLoading) { 
	            store.dispatch( saveAllPlayerPositions({ positions: result.data }) )
	            this.setState({ positions: result.data })
	          }
	        }
	      })
	}

	componentWillUnmount() {
		this.state.isLoading = false
	}

	handleChange(e){
		this.setState({ [e.target.name]: e.target.value })
	}

	handleTeamDropdownChange(selectedOption) {
		this.setState({ team_id: selectedOption.value })
	}

	handlePositionDropdownChange(selectedOption) {
		this.setState({ primary_position_id: selectedOption.value })
	}

	handleBatsDropdownChange(selectedOption) {
		this.setState({ bats: selectedOption.value })
	}

	handleThrowsDropdownChange(selectedOption) {
		this.setState({ throws: selectedOption.value })
	}

	handleSubmit(event) {
	    event.preventDefault()
	    this.setState({ isHidden: true })

	    const { id, first_name, last_name, team_id, primary_position_id, bats, throws } = this.state;

	    axios.patch('/api/players/' + this.state.id, { id, first_name, last_name, team_id,  primary_position_id, bats, throws })
	      .then((result) => {
	        if(result.status === 200) {
	        	let data = {
	        			id: (result.data.id) ? result.data.id : '',
	        			first_name: (result.data.first_name) ? result.data.first_name : '',
			      		last_name: (result.data.last_name) ? result.data.last_name : '',
			      		team_id: (result.data.team_id) ? result.data.team_id : '',
	      				primary_position_id: (result.data.primary_position_id) ? result.data.primary_position_id : '',
			      		bats: (result.data.bats) ? result.data.bats : '',
			      		throws: (result.data.throws) ? result.data.throws : ''
	        		}

	      		store.dispatch( saveSinglePlayer({ team: data }) )

				this.setState({ data }) 
	        }
	      })
	 
	  }

	render() {
		const { id, first_name, last_name, team_id, primary_position_id, bats, throws } = this.state

		const teamOptions = this.props.teams.map(function(row){
			return { value: row.id, label: row.city + ' ' + row.name}
		})

		const positionOptions = this.props.positions.map(function(row){
			return { value: row.id, label: row.abbreviation + ' - ' + row.name}
		})

		return (
		  <div className="container mx-auto">
		  	  <h1>Edit Player</h1>
			  {! this.state.isHidden && <EditedAlert />}
			  <form className="w-full max-w-xs" onSubmit={this.handleSubmit}>
			  <div className="md:flex md:items-center mb-6">
			    <div className="md:w-1/3">
			      <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-first-name">
			        First Name
			      </label>
			    </div>
			    <div className="md:w-2/3">
			      <input className="bg-grey-light appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-grey" id="inline-first-name" type="text" name="first_name" value={this.state.first_name} onChange={this.handleChange}/>
			    </div>
			  </div>

			  <div className="md:flex md:items-center mb-6">
			    <div className="md:w-1/3">
			      <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-last-name">
			        Last Name
			      </label>
			    </div>
			    <div className="md:w-2/3">
			      <input className="bg-grey-light appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-grey" id="inline-last-name" type="text" name="last_name" value={this.state.last_name} onChange={this.handleChange}/>
			    </div>
			  </div>

			   <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-team">
                    Team
                  </label>
                </div>
                <div className="md:w-2/3">
                  <Select defaultValue={ team_id } onChange={ this.handleTeamDropdownChange } options={ teamOptions } />
                </div>
              </div>

              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">	
                  <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-bats">
                    Primary Position
                  </label>
                </div>
                <div className="md:w-2/3">
                  <Select value={ primary_position_id } onChange={ this.handlePositionDropdownChange } options={ positionOptions } />
                </div>
              </div>

              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-bats">
                    Bats
                  </label>
                </div>
                <div className="md:w-2/3">
                  <Select value={ bats } onChange={ this.handleBatsDropdownChange } options={ batsOptions } />
                </div>
              </div>

              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-throws">
                    Throws
                  </label>
                </div>
                <div className="md:w-2/3">
                  <Select value={ throws } onChange={ this.handleThrowsDropdownChange } options={ throwsOptions } />
                </div>
              </div>

              <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                  <input className="bg-green-darker hover:bg-green text-white font-bold py-2 px-4 rounded" type="submit" name="submit" value="Submit"/>
                </div>
              </div>
			</form>
			</div>
		) 
	}
}

const EditedAlert = () => (
    <div className="flex mb-6">
      <div className="flex-initial border-2 border-green bg-yellow-lighter text-green-dark py-2 px-4 font-semibold rounded">
          Team has been updated
      </div>
    </div>
)

export default connect(mapStateToProps)(PlayersEdit)
