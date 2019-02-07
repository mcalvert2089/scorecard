import React, { Component } from 'react'
import { connect } from "react-redux"
import { HashRouter, Route, Link } from "react-router-dom"
import MenuContainer from "./MenuContainer"

const iconStyle = {
  fontSize: '48px',
  color: 'white'
};

const mapStateToProps = state => ({ 
	initialAppLoading: state.initialAppLoading,
	pageLoading: state.pageLoading,
	first_name: state.user.first_name,
})

class Header extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			mobile_menu_open: false,
			visible:false
		}

		this.handleMouseDown = this.handleMouseDown.bind(this)
		this.toggleMenu = this.toggleMenu.bind(this)
	}

	handleMouseDown(e) {
		this.toggleMenu()
		e.stopPropagation()
	}

	toggleMenu() {
	  this.setState({
	      visible: ! this.state.visible
	  })
	}

	render() {
		const { first_name } = this.props
		let loggedIn = localStorage.getItem('loggedIn')

		return (
			<HashRouter>
				<div>
					<header>
						<div className="container mx-auto">
							<nav className="flex items-center justify-between flex-wrap p-6">
							  <div className="flex items-center flex-no-shrink text-white mr-6">
							    <i className="fas w-1/4 fa-baseball-ball flex-1 mr-2" style={iconStyle}></i>
							    <span className="font-semibold text-xl tracking-tight text-2xl">Scorecard</span>
							  </div>
							  <div className="block lg:hidden">
							    <MenuContainer/>
							  </div>
							  <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto md:hidden sm:hidden xs:hidden">
							    <div className="text-sm lg:flex-grow">
							      <Link to="/" className="nav-link">Home</Link>
							      <Link to="/teams" className="nav-link">Teams</Link>
							      <Link to="/players" className="nav-link">Players</Link>
							    </div>
							    
							    { ! loggedIn && (
							      <div>
							        <Link to="/login" className="header-button">Login</Link>
							        <Link to="/register" className="header-button">Register</Link>
							      </div>
							    )}

							    { loggedIn && ! this.props.initialAppLoading && (
							      <div>
								      <div className="inline-block text-sm px-4 py-2 leading-none text-white mt-4 mr-1 lg:mt-0">
								      	Welcome { first_name }
								      </div>
							          <div className="inline-block px-4 py-2 leading-none mt-4 lg:mt-0">
							          	<Link to="/logout" className="header-button">Logout</Link>
							      	  </div>
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

export default connect(mapStateToProps)(Header)
