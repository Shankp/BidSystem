import react, { Component } from 'react';
import { Button, Label, Input, Form } from 'reactstrap';
import './Login.css';
import { LoginService } from '../../Services/AuthService'
import Navbar from "../bar/navbar";
//import {Cookies } from "react-cookie";
import { withRouter } from 'react-router';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.gotoRegister = this.gotoRegister.bind(this);
        this.login = this.login.bind(this);

    }


    gotoRegister = () => {
        this.props.history.push("/Register");
    }
    handleUserName(text) {
        this.setState({ email: text.target.value });
    }
    handlePassword(text) {
        this.setState({ password: text.target.value });
    }
    login = async (e) => {
        e.preventDefault();

        var logonParams = {
            email: this.state.email,
            password: this.state.password
        }

        try {
            var userInfo = await LoginService(logonParams);
            if (userInfo != null) {
                sessionStorage.setItem('token', userInfo.data.token);
                
                this.props.history.push({
                    pathname: '/LoggedUserList',
                    state: { isLoggedin: true }
                  });
                //needs to be test more
                // let d = new Date();
                // d.setTime(d.getTime() + (24 * 60 * 1000));
                // console.log(d)
                // Cookies.set("logonToken", userInfo.data.token, {expires: d });

                // Cookies.get("logonToken").then((cookie) => {
                //     console.log(cookie);
                //  });
            }
            console.log(userInfo.data)

        } catch (error) {
            //let errorMsg = (error.cause ? JSON.stringify(error.cause) : "Error in login request!");
            //NotificationManager.error(`${errorMsg}`, 'Login');
        }
    }
    render() {
        return (

            <div className="login-page">
                <div>
                    <Navbar />
                </div>
                <div className="form">
                    <Form className="login-form" onSubmit={this.login}>
                        <h4><span className="font-weight-bold" ></span></h4>
                        <hr />
                        <Label>User Name</Label>
                        <Input type="email" name="userName" placeholder="UserName" onChange={(text) => { this.handleUserName(text) }} required></Input>

                        <Label>Password</Label>
                        <Input type="password" name="password" placeholder="Password" onChange={(password) => { this.handlePassword(password) }} required />
                        <Button className="boto-btn" type='submit'>Log in</Button>
                    </Form>
                    <Button onClick={this.gotoRegister} type='submit' className="boto-btn">Create new</Button>
                </div>

            </div>
        );
    }
}
export default withRouter(Login)