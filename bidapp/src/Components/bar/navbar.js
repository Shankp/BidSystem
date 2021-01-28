import react, { Component } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { UserValidate, Logout } from '../../Services/AuthService'
import { createHashHistory } from "history";
import './navbar.css';

export default class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedin: false
    }

    this.isLoggedOnUser = this.isLoggedOnUser.bind(this);
  }

  async componentDidMount() {
    await this.isLoggedOnUser();
  }

  isLoggedOnUser = async () => {
    var isUserLogged = await UserValidate();
    console.log(isUserLogged)
    if (isUserLogged != null) {
      this.setState({ isLoggedin: isUserLogged });
    }

  }

  Logout = () => {
    console.log("Logout");
    Logout();
    //this.setState({ redirect: true });
    const history = createHashHistory();
    history.go("/");
  }



  render() {
    // const isLoggedIn = this.state.isLoggedin;
    // console.log(isLoggedIn)
    // let nav;
    // if (isLoggedIn.data) {
    //   nav = <ul className="navbar-nav ml-auto">
    //     <li className="nav-item">

    //       <button onClick={this.Logout}>Sign out</button>
    //       {/* <div className="nav-link"> </div> */}
    //       {/* <Link className="nav-link" to={"/LogOut"}>Sign Out</Link> */}
    //     </li>
    //   </ul>;
    // }
    // else {

    //   nav = <ul className="navbar-nav ml-auto">
    //     <li className="nav-item">
    //       <Link className="nav-link" to={"/Login"}>Sign in</Link>
    //     </li>
    //     <li className="nav-item">
    //       <Link className="nav-link" to={"/Register"}>Sign up</Link>
    //     </li>
    //   </ul>;
    // }


    return (
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>BidExpress</Link>
          <div className="collapse navbar-collapse">
            {/* {nav} */}
            {
              this.state.isLoggedin.data ?
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                  <button className="btn-style" onClick={this.Logout}>Add New Item </button>
                    <button onClick={this.Logout}>Sign out</button>
                    {/* <div className="nav-link"> </div> */}
                    {/* <Link className="nav-link" to={"/LogOut"}>Sign Out</Link> */}
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
            {/* <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/Login"}>Sign in</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/Register"}>Sign up</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/LogOut"}>Sign Out</Link>
              </li>
            </ul> */}
          </div>
        </div>
      </nav>
    );
  }

}