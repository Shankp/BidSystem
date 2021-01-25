import react, { Component } from 'react';
import { Button, Label, Input, Form } from 'reactstrap';
import './Login.css';

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.gotoRegister = this.gotoRegister.bind(this);

    }

    gotoRegister = () => {
        this.props.history.push("/sign-up");
    }

    render() {
        return (
            <div className="login-page">
                <div className="form">
                    <Form className="login-form" onSubmit={this.login}>
                        <h4><span className="font-weight-bold" ></span></h4>
                        <hr />
                        <Label>User Name</Label>
                        <Input type="text" name="userName" placeholder="UserName" onChange={(text) => { this.handleUserName(text) }} required></Input>

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