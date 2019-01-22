import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import axios from 'axios'

export default class TeamsAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: '',
      manager: '',
      city: '',
      state: '',
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
    const { name, manager, city, state } = this.state;
    // TODO: don't hard code user_id, get it from state
    let user_id = '1'

    axios.post('/api/teams', { name, manager, city, state, user_id },
          { 
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem('access_token')
            }
        })
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
      <div>
        {! this.state.isHidden && <AddedAlert />}
        <form className="w-full max-w-md" onSubmit={this.handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">Team Name</label>
              <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" name="name" onChange={this.handleChange} required />
            </div>
            <div className="w-full px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">Manager</label>
              <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" name="manager" onChange={this.handleChange} />
            </div>
            <div className="w-full px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">City</label>
              <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" name="city" onChange={this.handleChange} />
            </div>
            <div className="w-full px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">State</label>
              <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" name="state" onChange={this.handleChange} />
            </div>
            <div className="w-full px-3 mb-6 md:mb-0">
              <input className="border-2 border-green text-green hover:border-grey hover:text-grey cursor-pointer rounded" type="submit" name="submit" value="Add"/>
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