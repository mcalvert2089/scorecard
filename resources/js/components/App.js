import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import ActivateAccount from './ActivateAccount'
import NotFound from './NotFound'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div id="content">
	        <div>
	          <Header />
	        </div>
			<Switch>
				<Route exact path='/' component={Home}/>

      			<Route path='/activate/:key' component={ActivateAccount}/>
      			
      			<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />

				// 404
      			<Route path="*" component={NotFound} />
			</Switch>
		</div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))