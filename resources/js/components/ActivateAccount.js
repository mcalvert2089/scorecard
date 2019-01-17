import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

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
	  		showForm: true,
	  		alreadyActive: false,
	  		isLoading: true
		}

		const key = this.props.match.params.key
		
		axios.post('/api/user-check-active/', { activation_key: key } )
		.then((result) => {
		  if(result.status === 200) {
		  	this.setState({
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
		const activation_key = this.props.match.params.key
		const { password } = this.state;

		axios.post('/account-activate', { activation_key, password })
		.then((result) => {
		  if(result.status === 200) {
		  	this.toggleHidden()
		  }
		})
	}
	toggleHidden () {
		this.setState({
		  showForm: ! this.state.showForm
		})
	}
	render() {
		const { isLoading } = this.state;

	    if (isLoading) {
	      return <p>Loading ...</p>;
	    }
		
		return (
		<div>	
			{ this.state.alreadyActive && (
				<div>Key not found!</div>
			)}		
			
			{ this.state.showForm && ! this.state.alreadyActive && ( 
				<form className="w-full max-w-md" onSubmit={this.handleSubmit}>
				  <div className="flex flex-wrap -mx-3 mb-6">
				    <div className="w-full px-3 mb-6 md:mb-0">
				      <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">Enter a Password</label>
				      <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="password" name="password" onChange={this.handleChange} required />
				    </div>
				    <div className="w-full px-3 mb-6 md:mb-0">
				      <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">Verify Password</label>
				      <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="password" name="verify_password" onChange={this.handleChange} required />
				    </div>
				    <div className="w-full px-3 mb-6 md:mb-0">
				      <input className="border-2 border-green text-green hover:border-grey hover:text-grey cursor-pointer rounded" type="submit" name="submit" value="Register"/>
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