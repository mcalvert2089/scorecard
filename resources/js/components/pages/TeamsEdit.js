import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {connect} from "react-redux"
import axios from 'axios'
import { togglePageLoad, saveSingleTeam, updateTeamInfo } from '../../../js/actions/index'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

const addStyle = {
  fontSize: '16px',
  paddingRight: '6px'
};

class TeamsEdit extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			id: props.match.params.id,
			name: '',
			manager: '',
			city: '',
			state: '',
			user_id: '',
      		isHidden: true
		}

		this.handleChange = this.handleChange.bind(this)
	    this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentDidMount() {
		const getTeams = axios.get('/api/teams/' + this.state.id)
	    .then((result) => {
	      if(result.status === 200) {
	      	this.setState({ 
	      		name: (result.data.name) ? result.data.name : '',
	      		manager: (result.data.manager) ? result.data.manager : '',
	      		city: (result.data.city) ? result.data.city : '',
	      		state: (result.data.state) ? result.data.state : ''
	      	})
	      }
	    })

	    Promise.all([getTeams]).then(
			() =>  store.dispatch(togglePageLoad({ pageLoading: false }))
		)
	}

	componentWillUnmount() {
		store.dispatch(togglePageLoad({ pageLoading: true }))
	}

	handleChange(e){
		this.setState({ [e.target.name]: e.target.value })
	}

	handleSubmit(event) {
	    event.preventDefault()
	    this.setState({ isHidden: true })

	    const { name, manager, city, state } = this.state;

	    axios.patch('/api/teams/' + this.state.id, { name, manager, city, state })
	      .then((result) => {
	        if(result.status === 200) {
	      		store.dispatch( saveSingleTeam({ team: {
	        			id: result.data.id,
	        			name: result.data.name,
			      		manager: result.data.manager,
			      		city: result.data.city,
			      		state: result.data.state 
	        		}
	        	}) )

				this.setState({ 
		      		name: result.data.name,
		      		manager: result.data.manager,
		      		city: result.data.city,
		      		state: result.data.state,
		      		isHidden: false
		      	}) 
	        }
	      })
	  }

	render() {
		return (
			<div className="container mx-auto">
				<h1>Edit Team</h1>
				{! this.state.isHidden && <EditedAlert />}
				<form className="w-full max-w-xs" onSubmit={this.handleSubmit}>
					<div className="md:flex md:items-center mb-6">
						<div className="md:w-1/3">
						  <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
						    Team Name
						  </label>
						</div>
						<div className="md:w-2/3">
						  <input className="bg-grey-light appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-grey" id="inline-full-name" type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
						</div>
					</div>

					<div className="md:flex md:items-center mb-6">
						<div className="md:w-1/3">
						  <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-manager">
						    Manager
						  </label>
						</div>
						<div className="md:w-2/3">
						  <input className="bg-grey-light appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-grey" id="inline-full-name" type="text" name="manager" value={this.state.manager} onChange={this.handleChange}/>
						</div>
					</div>

					<div className="md:flex md:items-center mb-6">
						<div className="md:w-1/3">
						  <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-city">
						    City
						  </label>
						</div>
						<div className="md:w-2/3">
						  <input className="bg-grey-light appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-grey" id="inline-full-name" type="text" name="city" value={this.state.city} onChange={this.handleChange}/>
						</div>
					</div>

					<div className="md:flex md:items-center mb-6">
						<div className="md:w-1/3">
						  <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-state">
						    State
						  </label>
						</div>
						<div className="md:w-2/3">
						  <input className="bg-grey-light appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-grey" id="inline-full-name" type="text" name="state" value={this.state.state} onChange={this.handleChange}/>
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

export default TeamsEdit