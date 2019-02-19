import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import { togglePageLoad } from '../../js/actions/index'
import { validate } from './form-elements/validation'

const addStyle = {
  fontSize: '16px',
  paddingRight: '6px'
};

export default class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
	  		email: '',
	  		showForm: true,
	  		errors: []
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

		this.setState({ errors: [] })

		let valid = validate([ { 
	        name: 'Email',
	        field_name: 'email',
	        rules: 'required|email',
	        value: (this.state.email) ? this.state.email : ''
	      }
	    ])

		this.setState({ errors: valid })
    
    	if(Object.keys(valid).length === 0) {
	    	const { email } = this.state
			var self = this

			axios.post('/register', { email })
			.then((result) => {
			  if(result.status === 200) {
			  	self.setState({ showForm: true })
			  }
			})
			.catch(function (error) {
				let errorMessage = (typeof error.response.data.errors.email[0] !== 'undefined') ? error.response.data.errors.email[0] : 'An error has occured'
				self.setState({ errors: { email: errorMessage } })
			})
		}
	}

	render() {
		return (
		<div>
			{ this.state.showForm && ( 
				<form className="w-full max-w-md container mx-auto" onSubmit={this.handleSubmit}>
				  <div className="flex flex-wrap -mx-3 mb-6">
				    <div className="w-full px-3 mb-6 md:mb-0">
				      <label>Email</label>
				      <input className="text-field" type="text" name="email" onChange={this.handleChange} />
				    </div>
				    { this.state.errors.email && ( <div className="error">{ this.state.errors.email }</div> ) }
				    <div className="w-full px-3 mt-4 mb-6 md:mb-0">
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