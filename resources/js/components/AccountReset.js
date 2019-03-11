import React, { Component } from 'react'
import { togglePageLoad } from '../../js/actions/index'
import { validate } from './form-elements/validation'

class AccountReset extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			errors: [],
			passwordSent: false
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentDidMount() {
		store.dispatch(togglePageLoad({ pageLoading: false }))
	}

	handleChange(event) {
		const target = event.target
		const value = target.value
		const name = target.name

		this.setState({
			[ name ]: value
		})
	}

	handleSubmit(event) {
		event.preventDefault()
		
		
		let valid = validate([ { 
	        name: 'Email',
	        field_name: 'email',
	        rules: 'required|email',
	        value: (this.state.email) ? this.state.email : ''
	      }
	    ])

		if(Object.keys(valid).length > 0) this.setState({ errors: valid })
    	if(Object.keys(valid).length === 0) {
    		store.dispatch(togglePageLoad({ pageLoading: true }))
			const { email } = this.state
			const self = this

			axios.post('/password/email', { email: email })
		    .then((result) => {
		      if(result.status === 200) {
	      		self.setState({ passwordSent: true })
	      		store.dispatch(togglePageLoad({ pageLoading: false }))
		      }
		    })
		}
	}

	render() {
		return (
			<div className="container">
				<div className="mx-auto">
					<div className="w-full px-3 mb-6 md:mb-0">
						{ this.state.passwordSent && (
								<div>Password has been sent! Please check your email.</div>
							)
						}
						{ ! this.state.passwordSent && (
								<form className="form-box" onSubmit={this.handleSubmit}>
						    		<label>Enter Email Address</label>
									<input className="text-field mb-3" type="text" name="email" onChange={this.handleChange} />
				    				{ this.state.errors.email && ( <div className="error">{ this.state.errors.email }</div> ) }

									<div className="flex items-center justify-between">
						    			<input type="submit" className="dark-button" value="Submit" />
						    		</div>
						    	</form>
					    	)
						}
					</div>
				</div>
			</div>
		)
	}
}

export default AccountReset