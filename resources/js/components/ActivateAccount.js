import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import { validateMinStringLength, validateEntriesMatch } from './form-elements/validation'
import { togglePageLoad } from '../../js/actions/index'


const addStyle = {
  fontSize: '16px',
  paddingRight: '6px'
};

export default class ActivateAccount extends React.Component {
	constructor(props) {
		super(props);

		this.state = { 
	  		password: '',
	  		verify_password: '',
	  		errors: [],
	  		showForm: true,
	  		alreadyActive: false,
	  		isLoading: true
		}

		const key = this.props.match.params.key
		let self = this

		axios.post('/api/user-check-active/', { activation_key: key } )
			.then((result) => {
			  if(result.status === 200) {
			  	store.dispatch(togglePageLoad({ pageLoading: false }))
			  	self.setState({
			  		showForm: true,
			  		alreadyActive: result.data.active,
			  		isLoading: false
			  	})
			  }
			})

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(e){
		this.setState({ [e.target.name]: e.target.value })
	}

	handleSubmit(event) {
		event.preventDefault()
		this.setState({ errors: [] })

		const activation_key = this.props.match.params.key
		const { password, verify_password } = this.state;

		let validLength = validateMinStringLength(password, 8)
		let validEntries = validateEntriesMatch('password', password, verify_password)
		
		if(validLength.inValid || validEntries.inValid) {
			let error = (validLength.message) ? validLength.message : validEntries.message
			this.setState({ errors: { password: error } })
		} else {
			axios.post('/account-activate', { activation_key, password })
			.then((result) => {
			  if(result.status === 200) {
			  	this.toggleHidden()
			  }
			})
		}
	}
	toggleHidden () {
		this.setState({
		  showForm: ! this.state.showForm
		})
	}
	render() {		
		return (
		<div>	
			{ this.state.alreadyActive && ! this.state.isLoading && (
				<div>Key not found!</div>
			)}		

			{ this.state.showForm && ! this.state.alreadyActive && ! this.state.isLoading && ( 
				<form className="w-full max-w-md" onSubmit={this.handleSubmit}>
				  <div className="flex flex-wrap -mx-3 mb-6">
				    <div className="w-full px-3 mb-6 md:mb-0">
				      <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">Enter a Password</label>
				      <input className="text-field" type="password" name="password" onChange={this.handleChange} />
				    </div>

				    <div className="w-full px-3 mb-6 md:mb-0">
				      <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">Verify Password</label>
				      <input className="text-field" type="password" name="verify_password" onChange={this.handleChange} />
				    </div>

				    { this.state.errors.password && (
				    		<div className="error">{ this.state.errors.password }</div>
				    	)
				    }
				    <div className="w-full px-3 mb-6 mt-2 md:mb-0">
				      <input className="dark-button" type="submit" name="submit" value="Register"/>
				    </div>
				  </div>
				</form>	
			)}	

			{ ! this.state.showForm && ! this.state.alreadyActive && <PasswordSubmitted /> }
		</div>
		) 
	}
}

const PasswordSubmitted = () => (
    <div>
        Thank you! You can now login.
    </div>
)