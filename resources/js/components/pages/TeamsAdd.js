import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from "react-redux"
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import axios from 'axios'

const mapStateToProps = (state) => ({ user: state.user })

class TeamsAdd extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      name: null,
      manager: null,
      city: null,
      state: null,
      user_id: props.user.id,
      isHidden: true
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
   this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.isHidden = true
    const { name, manager, city, state, user_id } = this.state;

    axios.post('/api/teams', { name, manager, city, state, user_id })
      .then((result) => {
        if(result.status === 200) {
          this.toggleHidden()
        }
      })
    this.isHidden = false
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
         <form className="w-full max-w-xs" onSubmit={this.handleSubmit}>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-name">
                Team Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input className="bg-grey-light appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-grey" id="inline-name" type="text" name="name" onChange={this.handleChange}/>
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-manager">
                Manager
              </label>
            </div>
            <div className="md:w-2/3">
              <input className="bg-grey-light appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-grey" id="inline-manager" type="text" name="manager" onChange={this.handleChange}/>
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-city">
                City
              </label>
            </div>
            <div className="md:w-2/3">
              <input className="bg-grey-light appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-grey" id="inline-city" type="text" name="city" onChange={this.handleChange}/>
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-state">
                State
              </label>
            </div>
            <div className="md:w-2/3">
              <input className="bg-grey-light appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-grey" id="inline-state" type="text" name="state" onChange={this.handleChange}/>
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <input className="bg-green-darker hover:bg-green text-white font-bold py-2 px-4 rounded" type="submit" name="submit" value="Add"/>
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
