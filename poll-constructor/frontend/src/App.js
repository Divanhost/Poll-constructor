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
import {AuthService} from "./services";
class App extends React.Component {

  constructor(props) {
    super(props);
   
    this.state = {
      loggedIn: false,
      currentUser: undefined
    };
  }

 logOut = () => {
    AuthService.logout();
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser;

    if (user) {
      this.setState({
        currentUser: user,
        loggedIn: true
      });
    }
  }
  render() {
    const { history } = this.props
    const {loggedIn, currentUser} = this.state;
    return (
      <div className="App">
      <Navbar loggedIn = {loggedIn} currentUser ={currentUser}/>
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
