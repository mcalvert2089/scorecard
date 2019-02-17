import React, { Component } from 'react'
import { togglePageLoad } from '../../js/actions/index'


class PasswordReset extends Component {
	constructor(props) {
	    super(props)
	    this.state = { 
			password: '',
			confirm_password: ''
	    }

	    this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	  }

	componentDidMount() {
		store.dispatch(togglePageLoad({ pageLoading: false }))
	}

	handleChange(e){
		this.setState({ [e.target.name]: e.target.value })
	}

	handleSubmit(event) {
	    event.preventDefault()
	}

	render() {
		return (
			<div>
 				<div className="md:flex md:items-center mb-6">
				    <div className="md:w-1/3">
				      <label htmlFor="inline-password">
				        New Password
				      </label>
				    </div>
				    <div className="md:w-2/3">
				      <input className="text-field" id="inline-password" type="text" name="password" onChange={this.handleChange}/>
				    </div>
				  </div>

				  <div className="md:flex md:items-center mb-6">
				    <div className="md:w-1/3">
				      <label htmlFor="inline-confirm-password">
				        Confirm Password
				      </label>
				    </div>
				    <div className="md:w-2/3">
				      <input className="text-field" id="inline-confirm-password" type="text" name="confirm_password" onChange={this.handleChange}/>
				    </div>
				  </div>

				  <div className="md:flex md:items-center">
	                <div className="md:w-1/3"></div>
	                <div className="md:w-2/3">
	                  <input className="dark-button" type="submit" name="submit" value="Submit"/>
	                </div>
	              </div>
			</div>
		)
	}
}

export default PasswordReset