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
    var isUserLogged = await UserValidate();
    console.log(isUserLogged)
    if (isUserLogged != null) {
      this.setState({ isLoggedin: isUserLogged });
    }

  }

  getUserType = async () => {
    var userType = await GetUserType();
    this.setState({ userType: userType.data })
    console.log(userType.data)
  }

  logout = () => {
    Logout();
    const history = createHashHistory();
    history.go("/");
  }

  goToAddItem = () => {
    console.log('click add item button')
    //this.props.history.push('/AddItem');
    this.setState({ addItemModalShow: true })
    console.log(this.state.addItemModalShow)
  }

  handleOnHide(closeModal) {
    console.log(closeModal)
    this.setState({
      addItemModalShow: false
    })
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
      <div style={{ margin: '10px' }}>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/"}>BidExpress</Link>
            <div className="collapse navbar-collapse">
              {/* {nav} */}
              {
                this.state.isLoggedin.data ?
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      {
                        this.state.userType == 1 && this.state.userType != null ?
                          <button className="btn-style" onClick={this.goToAddItem}>Add New Item </button> :
                          <div></div>
                      }
                      {/* <button className="btn-style" onClick={this.goToAddItem}>Add New Item </button> */}
                      {/* <Link className="nav-link" to={"/AddItem"}>Add New</Link> */}
                      <button onClick={this.logout}>Sign out</button>
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


        {this.state.addItemModalShow ? <AddNewItem
          show={this.state.addTagsModalShow}
          onHide={this.handleOnHide} /> : null}
      </div>

    );
  }

}
export default withRouter(Navbar)