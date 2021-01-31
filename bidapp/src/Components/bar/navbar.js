import react, { Component } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { UserValidate, Logout, GetUserType } from '../../Services/AuthService'
import { createHashHistory } from "history";
import './navbar.css';
import { withRouter } from 'react-router';
import { AddNewItem } from '../Item/AddNewItem';

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedin: false,
      addItemModalShow: false,
      userType: null
    }

    this.isLoggedOnUser = this.isLoggedOnUser.bind(this);
    this.goToAddItem = this.goToAddItem.bind(this);
    this.getUserType = this.getUserType.bind(this);
    this.handleOnHide = this.handleOnHide.bind(this);
  }

  async componentDidMount() {
    await this.isLoggedOnUser();
    await this.getUserType();

  }

  isLoggedOnUser = async () => {
    try {
      var isUserLogged = await UserValidate();
      console.log(isUserLogged)
      if (isUserLogged != null) {
        this.setState({ isLoggedin: isUserLogged });
      }
    } catch (error) {

    }
  }

  getUserType = async () => {
    try {
      var userType = await GetUserType();
      this.setState({ userType: userType.data })
      console.log(userType.data)
    } catch (error) {

    }
  }

  logout = () => {
    Logout();
    const history = createHashHistory();
    history.go("/");
  }

  goToAddItem = () => {
    this.setState({ addItemModalShow: true })

  }

  handleOnHide(closeModal) {

    this.setState({
      addItemModalShow: false
    })
  }


  render() {
    return (
      <div style={{ margin: '10px' }}>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/"}>BidExpress</Link>
            <div className="collapse navbar-collapse">
              {
                this.state.isLoggedin.data ?
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      {
                        this.state.userType == 1 && this.state.userType != null ?
                          <button className="btn-style" onClick={this.goToAddItem}>Add New Item </button> :
                          <div></div>
                      }
                      <button onClick={this.logout}>Sign out</button>

                    </li>
                  </ul>
                  :
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to={"/Login"}>Sign in</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/Register"}>Sign up</Link>
                    </li>
                  </ul>
              }
            </div>
          </div>
        </nav>

        {this.state.addItemModalShow ? <AddNewItem
          show={this.state.addTagsModalShow}
          onHide={this.handleOnHide} /> : null}
      </div>

    );
  }

}
export default withRouter(Navbar)