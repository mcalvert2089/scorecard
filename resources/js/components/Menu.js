import React, { Component } from "react"
import { Link } from "react-router-dom"
 
class Menu extends Component {
  render() {
    var visibility = "hide"
 
    if (this.props.menuVisibility) {
      visibility = "show"
    }
 
    return (
      <div id="flyoutMenu"
           onMouseDown={this.props.handleMouseDown} 
           className={visibility}>
          <h2>
            <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4">Home</Link>
          </h2>
          <h2>
            <Link to="/teams" className="block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4">Teams</Link>
          </h2>
          <h2>
            <Link to="/players" className="block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4">Players</Link>
          </h2>
          <h2>
            <Link to="/logout" className="block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4">Logout</Link>
          </h2>
      </div>
    )
  }
}
 
export default Menu