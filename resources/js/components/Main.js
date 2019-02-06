import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect, Provider } from 'react-redux'
import { createStore } from 'redux'
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom'
import store from '../store/index'
import Home from './Home'
import Login from './Login'
import Logout from './Logout'
import Register from './Register'
import ActivateAccount from './ActivateAccount'
import Teams from './pages/Teams'
import TeamsAdd from './pages/TeamsAdd'
import TeamsEdit from './pages/TeamsEdit'
import Players from './pages/Players'
import PlayersAdd from './pages/PlayersAdd'
import PlayersEdit from './pages/PlayersEdit'
import NotFound from './NotFound'
import Loading from './Loading'

window.store = store

const RedirectIfLoggedIn =  ({ ...props }) => {
    return localStorage.getItem('loggedIn')
        ? ( <Redirect to="/" /> )
        : ( <Route {...props} /> )
}

const mapStateToProps = (state) => ({ 
  teams: state.teams,
  user: state.user,
  positions: state.positions,
  pageLoading: state.pageLoading
})

class Main extends Component {
  constructor(props) {
      super(props)
  }

  render () {
    let loggedIn = localStorage.getItem('loggedIn')

    return (
          <div className="container mx-auto pl-3 pr-3">
            <div className={ this.props.pageLoading ? 'show' : 'hidden'}>
              <div>
               <Loading />
              </div>
             </div>
             <div className={! this.props.pageLoading ? 'show' : 'hidden'}>
               <HashRouter>
                <Switch>
                  // public routes
                  <Route exact path='/' component={Home} />

                  <RedirectIfLoggedIn path="/login" component={Login} />
                  <RedirectIfLoggedIn path="/register" component={Register} />
                  <RedirectIfLoggedIn path='/activate/:key' component={ActivateAccount} />

                  { ! loggedIn && <Redirect to="/login" /> }

                  // protected routes
                  <Route path='/logout' component={Logout} />
                  
                  // Teams
                  <Route exact path='/teams' component={Teams} />
                  <Route exact path='/teams/add' component={TeamsAdd} />
                  <Route exact path='/teams/edit/:id' component={TeamsEdit} />

                  // Players
                  <Route exact path='/players' component={Players} />
                  <Route path='/players/add' component={PlayersAdd} />
                  <Route exact path='/players/edit/:id' component={PlayersEdit} />

                  // 404
                  <Route path="*" component={NotFound} />
                </Switch>
              </HashRouter>
            </div>
          </div>
    )
  }
}

export default connect(mapStateToProps)(Main)

