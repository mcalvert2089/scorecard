import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

const addStyle = {
  fontSize: '16px',
  paddingRight: '6px'
};

export default class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
	  		email: '',
	  		showForm: true
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(e){
		this.setState({ [e.target.name]: e.target.value })
	}

	handleSubmit(event) {
		event.preventDefault()
		const { email } = this.state;

		axios.post('/register', { email })
		.then((result) => {
		  if(result.status === 200) {
		  	this.toggleHidden()
		  } else {

		  }
		})
	}
	toggleHidden () {
		this.setState({
		  showForm: ! this.state.showForm
		})
	}
	render() {
		return (
		<div>
			{ this.state.showForm && ( 
				<form className="w-full max-w-md" onSubmit={this.handleSubmit}>
				  <div className="flex flex-wrap -mx-3 mb-6">
				    <div className="w-full px-3 mb-6 md:mb-0">
				      <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">Email</label>
				      <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" name="email" onChange={this.handleChange} required />
				    </div>
				    <div className="w-full px-3 mb-6 md:mb-0">
				      <input className="border-2 border-green text-green hover:border-grey hover:text-grey cursor-pointer rounded" type="submit" name="submit" value="Register"/>
				    </div>
				  </div>
				</form>	
			)}		
			{ ! this.state.showForm && <RegistrationSubmitted /> }
		</div>
		) 
	}
}

const RegistrationSubmitted = () => (
    <div>
        Thank you! Please check your email to complete your registration.
    </div>
)