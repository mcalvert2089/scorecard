import React, { Component } from 'react'
import { HashRouter, Route, Link } from "react-router-dom"

const iconStyle = {
  fontSize: '28px',
  color: 'white'
};

class Header extends Component {
	render() {
		let loggedIn = localStorage.getItem('loggedIn')
		return (
			<HashRouter>
				<div>
					<header className="bg-green-darker">
						<div className="container mx-auto">
							<nav className="flex items-center justify-between flex-wrap p-6">
							  <div className="flex items-center flex-no-shrink text-white mr-6">
							    <i className="fas w-1/4 fa-baseball-ball flex-1 mr-2" style={iconStyle}></i>
							    <span className="font-semibold text-xl tracking-tight">Scorecard</span>
							  </div>
							  <div className="block lg:hidden">
							    <button className="flex items-center px-3 py-2 border rounded hover:text-white hover:border-white">
							      <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
							    </button>
							  </div>
							  <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
							    <div className="text-sm lg:flex-grow">
							      <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4">Home</Link>
							      <Link to="/teams" className="block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4">Teams</Link>
							      <Link to="/players" className="block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4">Players</Link>
							    </div>
							    
							    { ! loggedIn && (
							      <div>
							        <Link to="/login" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal hover:bg-white mt-4 mr-2 lg:mt-0">Login</Link>
							        <Link to="/register" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal hover:bg-white mt-4 lg:mt-0">Register</Link>
							      </div>
							    )}

							    { loggedIn && (
							      <div>
							        <Link to="/logout" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal hover:bg-white mt-4 lg:mt-0">Logout</Link>
							      </div>
							    )}
							  </div>
							</nav>
						</div>
					</header>
					<div id="banner" className="mb-8"></div>
				</div>
			</HashRouter>
		)
	}
}

export default Header