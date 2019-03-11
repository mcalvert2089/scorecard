import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from "react-redux"
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import { togglePageLoad } from '../../../js/actions/index'
import axios from 'axios'
import { validate } from '../form-elements/validation'

const mapStateToProps = (state) => ({ user: state.user })

class TeamsAdd extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      name: '',
      manager: '',
      city: '',
      state: '',
      user_id: props.user.id,
      isHidden: true,
      errors: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
   this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    let self = this
    this.isHidden = true
    const { name, manager, city, state, user_id } = this.state;

    let valid = validate([ { 
        name: 'Team Name',
        field_name: 'name',
        rules: 'required',
        value: (this.state.name) ? this.state.name : ''
      }
    ])
    
    if(Object.keys(valid).length > 0) this.setState({ errors: valid })
    if(Object.keys(valid).length === 0) {
      const createTeam = axios.post('/api/teams', { name, manager, city, state, user_id })
      .then((result) => {
          if(result.status === 200) {
            self.setState({ isHidden: false })
          }
        })
    }
  }

  componentDidMount() {
    store.dispatch(togglePageLoad({ pageLoading: false }))
  }

  componentWillUnmount() {
    store.dispatch(togglePageLoad({ pageLoading: true }))
  }

  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

render() {
  return (
      <div className="container mx-auto">
        <h1>Create Team</h1>
        {! this.state.isHidden && <AddedAlert />}
         <form className="w-full" onSubmit={this.handleSubmit}>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label htmlFor="inline-name">
                Team Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input className="text-field" id="inline-name" type="text" name="name" onChange={this.handleChange}/>
              { this.state.errors.name && ( <div className="error">{ this.state.errors.name }</div> ) }
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label htmlFor="inline-manager">
                Manager
              </label>
            </div>
            <div className="md:w-2/3">
              <input className="text-field" id="inline-manager" type="text" name="manager" onChange={this.handleChange}/>
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label htmlFor="inline-city">
                City
              </label>
            </div>
            <div className="md:w-2/3">
              <input className="text-field" id="inline-city" type="text" name="city" onChange={this.handleChange}/>
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label htmlFor="inline-state">
                State
              </label>
            </div>
            <div className="md:w-2/3">
              <input className="text-field" id="inline-state" type="text" name="state" onChange={this.handleChange}/>
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <input className="dark-button" type="submit" name="submit" value="Add"/>
            </div>
          </div>
        </form>
        </div>
    )
  }
}  

const AddedAlert = () => (
    <div className="flex mb-6">
      <div className="flex-initial border-2 border-green bg-yellow-lighter text-green-dark py-2 px-4 font-semibold rounded">
          A new team has been added
      </div>
    </div>
)

export default connect(mapStateToProps)(TeamsAdd)
