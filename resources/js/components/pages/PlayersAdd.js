import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import axios from 'axios'

const mapStateToProps = state => {
  return { user: state.user }
}

export default class PlayersAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      first_name: '',
      last_name: '',
      team_id: '',
      user_id: '',
      bats: '',
      throws: '',
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
    const { first_name, last_name, team_id, bats, throws } = this.state;
    let user_id = props.user.id

    axios.post('/api/players', { first_name, last_name, team_id, user_id, bats, throws })
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
        <h1>Create Player</h1>
        {! this.state.isHidden && <AddedAlert />}
         <form className="w-full max-w-xs" onSubmit={this.handleSubmit}>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-first-name">
                First Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input className="bg-grey-light appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-grey" id="inline-first-name" type="text" name="name" onChange={this.handleChange}/>
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-manager">
                Last Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input className="bg-grey-light appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-grey" id="inline-manager" type="text" name="manager" onChange={this.handleChange}/>
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
          A new player has been added
      </div>
    </div>
)