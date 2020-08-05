import React from 'react';
import './App.scss';
import 'fontsource-roboto';
import {
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom"
import { Workspace, PollTable, Navbar } from './pages';
import { Login, CustomModal } from './components';
import { AuthService } from "./services";


const service = new AuthService();
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined,
      loggedIn: false
    };
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

  componentWillMount() {
    const user = service.getCurrentUser;
    if (user) {
      this.setState({
        loggedIn: true,
        currentUser: user
      })
    }
    else {
      this.logOut();
    }
  }
  /* Addons */

  render() {
    const { history } = this.props
    const { currentUser, loggedIn } = this.state;
    return (
        <div className="App">
          <Navbar logOut={this.logOut} loggedIn= {loggedIn} currentUser={currentUser} />
          <div >
            <CustomModal isOpen={!loggedIn}>
              <Login>
              </Login>
            </CustomModal>
          </div>
          <Switch>
            <Route history={history} path='/home' component={() => <PollTable logOut={this.logOut} loggedIn={loggedIn}/>} />
            <Route exact history={history} path='/constructor' render={(props) => <Workspace {...props} logOut={this.logOut} />} />
            <Route history={history} path='/constructor/:id' render={(props) => <Workspace {...props} logOut={this.logOut} />} />
            <Redirect from='/' to='/home' />
          </Switch>
        </div>
    );
  }
}

export default withRouter(App);
