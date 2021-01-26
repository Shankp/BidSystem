import react ,{Component} from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class Navbar extends Component{

    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={"/"}>BidExpress</Link>
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/Login"}>Sign in</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/Register"}>Sign up</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        );
    }

}