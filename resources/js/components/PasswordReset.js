import React, { Component } from 'react'
import { togglePageLoad } from '../../js/actions/index'

class PasswordReset extends Component {
	constructor(props) {
	    super(props)
	    this.state = { 
	    	token: props.match.params.token,
	    	email: props.match.params.email,
			password: '',
			password_confirmation: '',
			passwordReset: false,
			validToken: false
	    }

	    this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	  }

	componentDidMount() {
		store.dispatch(togglePageLoad({ pageLoading: false }))

		const self = this

		axios.post('/api/check-token/' + this.state.token + '/' + this.state.email)
	    .then((result) => {
	      if(result.status === 200) {
      		self.setState({ validToken: result.data.valid })
      		store.dispatch(togglePageLoad({ pageLoading: false }))
	      }
	    })
	}

	handleChange(e){
		this.setState({ [e.target.name]: e.target.value })
	}

	handleSubmit(event) {
	    event.preventDefault()
	    store.dispatch(togglePageLoad({ pageLoading: true }))
		
		const { token, email, password, password_confirmation } = this.state
		const self = this

		axios.post('/password/reset', { token, email, password, password_confirmation })
	    .then((result) => {
	      if(result.status === 200) {
      		self.setState({ passwordReset: true })
      		store.dispatch(togglePageLoad({ pageLoading: false }))
	      }
	    })
	}

	render() {
		return (
			<div>
				{ ! this.state.validToken && ! this.state.passwordReset && ( 
					<div>Link has expired.</div>
				)}
				{ this.state.passwordReset && ( 
					<div>Your password has been reset.</div>
				)}
 				{ this.state.validToken && ! this.state.passwordReset && (
 					<form className="form-box" onSubmit={this.handleSubmit}>
		 				<div className="md:flex md:items-center mb-6">
						    <div className="md:w-1/3">
						      <label htmlFor="inline-password">
						        New Password
						      </label>
						    </div>
						    <div className="md:w-2/3">
						      <input className="text-field" id="inline-password" type="password" name="password" onChange={this.handleChange}/>
						    </div>
						  </div>

						  <div className="md:flex md:items-center mb-6">
						    <div className="md:w-1/3">
						      <label htmlFor="inline-confirm-password">
						        Confirm Password
						      </label>
						    </div>
						    <div className="md:w-2/3">
						      <input className="text-field" id="inline-confirm-password" type="password" name="password_confirmation" onChange={this.handleChange}/>
						    </div>
						  </div>

						  <div className="md:flex md:items-center">
			                <div className="md:w-1/3"></div>
			                <div className="md:w-2/3">
			                  <input className="dark-button" type="submit" name="submit" value="Submit"/>
			                </div>
			              </div>
			        </form>
		        )
		    }
			</div>
		)
	}
}

export default PasswordReset