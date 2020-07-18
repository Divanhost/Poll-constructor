import React from 'react';
import './App.scss';
import 'fontsource-roboto';
import {
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom"
import {Workspace,PollTable, Navbar} from './pages';
class App extends React.Component {
  render() {
    const { history } = this.props
    return (
      <div className="App">
      <Navbar/>
      <Switch>
        <Route history={history} path='/home' component={PollTable} />
        <Route history={history} path='/constructor' component={Workspace} />
        <Redirect from='/' to='/home'/>
      </Switch>
      </div>
    );
  }
}

export default withRouter(App);
