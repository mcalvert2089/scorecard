import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import store from '../store/index'
import { BrowserRouter, Route, Switch, withRouter, Link } from 'react-router-dom'
import { togglePageLoad } from '../../js/actions/index'
import Header from './Header'

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			error: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		store.dispatch(togglePageLoad({ pageLoading: false }))
	}

	componentWillUnmount() {
		store.dispatch(togglePageLoad({ pageLoading: true }))
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
		event.preventDefault()
		store.dispatch(togglePageLoad({ pageLoading: true }))
		
		const { email, password } = this.state;

		axios.post('/api/auth/login', { email, password })
		.then((result) => {
			if(result.status === 200) {
				if( typeof result.data.access_token !== 'undefined' ) {
					localStorage.setItem('loggedIn', true)
				  	localStorage.setItem('access_token', result.data.access_token);

				  	window.location.reload()
				}
			} 
		}).catch(function (error) {
			const message = (error.response.status === 401) ? 'Cannot Login. Email or password is invalid.' : 'There was a problem logging in.'
			this.setState({ error: message })
			store.dispatch(togglePageLoad({ pageLoading: false }))
		}.bind(this))
	}

	render () {
		return (
			<div className="container">
				<div id="login-box" className="mx-auto">
				  <form className="form-box" onSubmit={this.handleSubmit}>
				    <div className="mb-4">
				      <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">
				        Email
				      </label>
				      <input className="text-field" id="email" type="text" name="email" value={this.state.value} placeholder="Username" onChange={this.handleChange} />
				    </div>
				    <div className="mb-6">
				      <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
				        Password
				      </label>
				      <input className="text-field" id="password" type="password" name="password" placeholder="******************" onChange={this.handleChange} />
				    </div>
				    { this.state.error && <div className="error"> { this.state.error }</div> }
				    <div className="flex items-center justify-between">
				    	<input type="submit" className="dark-button" value="Sign In" />
				    </div>
				    <div className="flex items-center justify-between pt-4">
						<Link to="/register" className="text-sm">Sign Up</Link>
						<Link to="/account-reset" className="text-sm">Can't Login?</Link>
				    </div>
				  </form>
				</div>
			</div>
		)
	  }
	}

	export default withRouter(Login)