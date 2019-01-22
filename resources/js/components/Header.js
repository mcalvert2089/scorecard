import React, { Component } from 'react'
import { HashRouter as Router, Route, Link } from "react-router-dom"

const iconStyle = {
  fontSize: '28px',
  color: 'white'
};

class Header extends Component {
	render() {
		let loggedIn = localStorage.getItem('loggedIn')
		return (
			<Router>
				<header>
					<nav className="flex items-center justify-between flex-wrap bg-green-darker p-6">
						<div className="flex items-center flex-no-shrink text-white mr-6">
							<i className="fas w-1/4 fa-baseball-ball flex-1 mr-2" style={iconStyle}></i>
							<span className="font-semibold text-xl tracking-tight">Scorecard</span>
						</div>
						<div className="block lg:hidden">
							<button className="flex items-center px-3 py-2 border rounded border-teal-light hover:text-white hover:border-white">
							  <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
							</button>
						</div>

						<div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
							<div className="text-sm lg:flex-grow">
							  <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4">Home</Link>
							  <Link to="/teams" className="block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4">Teams</Link>
							</div>
						</div>

						{ ! loggedIn && (
							<div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
								<div className="text-sm lg:flex-grow">
								  <Link to="/login" className="block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4">Login</Link>
								</div>
							</div>
						)}

						{ loggedIn && (
							<div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
								<div className="text-sm lg:flex-grow">
								  <Link to="/logout" className="block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4">Logout</Link>
								</div>
							</div>
						)}
					</nav>
					<div id="banner" className="mb-8">
					</div>
				</header>
			</Router>
		)
	}
}

export default Header