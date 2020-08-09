import React from 'react';
import './App.scss';
import 'fontsource-roboto';
import {
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom"
import { BrowserRouter} from 'react-router-dom'
import { Workspace, PollTable, Navbar } from './pages';
import { PrivateRoute, LoginModal } from './components';
import { AuthService } from "./services";


const service = new AuthService();
class App extends React.Component {

  constructor(props) {
    super(props);
    const user = service.getCurrentUser();
    if (user) {
      this.state = {
        currentUser: user,
        loggedIn: true
      };
    }
    else {
      this.state = {
        currentUser: undefined,
        loggedIn: false
      };
      service.logout();
    }
  }

  logOut = () => {
    const { loggedIn } = this.state;
    if (loggedIn) {
      service.logout();
      this.setState((prevState) => {
        return {
          ...prevState,
          loggedIn: false
        }
      })
    }
  }
  logIn = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        loggedIn: true
      }
    })
  }

  customLoginModal = (loggedIn) => {
    return (
      <LoginModal isOpen={!loggedIn} logIn={this.logIn}/>
    )
  }
  /* Addons */
  render() {
    const { history } = this.props
    const { currentUser, loggedIn } = this.state;
    const auth = service.getCurrentUser() !== null;
    return (
        <div className="App">
          <Navbar logOut={this.logOut} loggedIn= {loggedIn} currentUser={currentUser} />
          {this.customLoginModal(loggedIn)}
          <BrowserRouter>
              <Switch>
                <Route history={history} path='/home' component={() => <PollTable logOut={this.logOut} loggedIn={loggedIn}/>} />
                <PrivateRoute exact history={history} path='/constructor' auth={auth} component={(props) => <Workspace {...props} logOut={this.logOut} />} />
                <PrivateRoute history={history} path='/constructor/:id'  auth={auth} component={(props) => <Workspace {...props} logOut={this.logOut} />} />
                <Route exact path ='*'>
                  <Redirect to='/home' />
                </Route>
              </Switch>
          </BrowserRouter>
          
        </div>
    );
  }
}

export default withRouter(App);
