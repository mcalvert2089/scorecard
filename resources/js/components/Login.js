import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import store from '../store/index'
import { isAuthenticated } from "../actions/index"
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom'
import Header from './Header'

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[ name ]: value
		})
	}

	handleSubmit(event) {
		event.preventDefault();
		const { email, password } = this.state;

		axios.post('/api/auth/login', { email, password })
	    .then((result) => {
	      if(result.status === 200) {
	      	if( typeof result.data.access_token !== 'undefined' ) {
		      	// store.dispatch( isAuthenticated(true) )
        		localStorage.setItem('loggedIn', true)
		      	localStorage.setItem('access_token', result.data.access_token);

		      	window.location.reload()
	      	}
	      }
	    })
	}

	render () {
		return (
			<div className="container">
				<div id="login-box" className="mx-auto">
				  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={this.handleSubmit}>
				    <div className="mb-4">
				      <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">
				        Email
				      </label>
				      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" name="email" value={this.state.value} placeholder="Username" onChange={this.handleChange} />
				    </div>
				    <div className="mb-6">
				      <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
				        Password
				      </label>
				      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" name="password" placeholder="******************" onChange={this.handleChange} />
				    </div>
				    <div className="flex items-center justify-between">
				    <input type="submit" className="bg-green-darker hover:bg-green text-white font-bold py-2 px-4 rounded" value="Sign In" />
				      <a className="inline-block align-baseline font-bold text-sm text-green-darker hover:text-green" href="#">
				        Forgot Password?
				      </a>
				    </div>
				  </form>
				</div>
			</div>
		)
	  }
	}

	export default withRouter(Login)