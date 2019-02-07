import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import { togglePageLoad } from '../../js/actions/index'

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

    componentDidMount() {
        store.dispatch(togglePageLoad({ pageLoading: false }))
    }

    componentWillUnmount() {
        store.dispatch(togglePageLoad({ pageLoading: true }))
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
				<form className="w-full max-w-md container mx-auto" onSubmit={this.handleSubmit}>
				  <div className="flex flex-wrap -mx-3 mb-6">
				    <div className="w-full px-3 mb-6 md:mb-0">
				      <label className="text-field">Email</label>
				      <input className="text-field" type="text" name="email" onChange={this.handleChange} required />
				    </div>
				    <div className="w-full px-3 mb-6 md:mb-0">
				      <input className="dark-button" type="submit" name="submit" value="Register"/>
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