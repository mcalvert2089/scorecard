import React, { Component } from "react"
import Menu from './Menu'
import MenuButton from './MenuButton'
 
class MenuContainer extends Component {
  constructor(props, context) {
    super(props, context)
 
    this.state = {
      visible: false
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
        visible: !this.state.visible
    })
  }

  render() {
    var visibility = "hide"
 
    if (this.props.menuVisibility) {
      visibility = "show"
    }
   return (
      <div>
        <MenuButton handleMouseDown={this.handleMouseDown}/>
        <Menu handleMouseDown={this.handleMouseDown} menuVisibility={this.state.visible}/>
      </div>
    )
  }
}
 
export default MenuContainer