import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

const addStyle = {
  fontSize: '16px',
  paddingRight: '6px'
};

export default class Teams extends React.Component {
	render() {
		return (
		  <div>
		    <h2>Teams</h2>
		    <i className="fas fa-plus" style={addStyle}></i>
		    <Link to='/teams/add' className="text-blue">Add Team</Link>
		  </div>
		) 
	}
}