import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from "react-redux"
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import axios from 'axios'
import { togglePageLoad } from '../../../../js/actions/index'

const mapStateToProps = (state) => ({ 
  teams: state.teams,
  user: state.user,
  positions: state.positions
})

class Scorecard extends Component {
	componentDidMount() {
		store.dispatch(togglePageLoad({ pageLoading: false }))
	}

	render() {
		return (
			<div>User will enter scorecard on this page.</div>
		)
	}
}
export default Scorecard