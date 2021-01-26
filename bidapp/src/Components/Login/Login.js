import react, { Component } from 'react';
import { Button, Label, Input, Form } from 'reactstrap';
import './Login.css';
import {LoginService} from '../../Services/AuthService'
import Navbar from "../bar/navbar";


export default class Login extends Component {
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
        this.props.history.push("/sign-up");
    }
    handleUserName(text) {
        this.setState({ email: text.target.value });        
    }
    handlePassword(text) {
        this.setState({ password: text.target.value });        
    }
    login = async(e)=>{
        e.preventDefault();

        var logonParams = {
            email: this.state.email,
            password: this.state.password
        }
     
        try {
            var userInfo = await LoginService(logonParams);
            if(userInfo!=null){
                sessionStorage.setItem('token',userInfo.data.token);
            }
            console.log(userInfo.data)
            
        } catch(error) {
            //let errorMsg = (error.cause ? JSON.stringify(error.cause) : "Error in login request!");
            //NotificationManager.error(`${errorMsg}`, 'Login');
        }
    }
    render() {
        return (
            
            <div className="login-page">
              <div>
              <Navbar/>
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