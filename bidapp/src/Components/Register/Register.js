import react, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './Register.css';
import {RegisterService} from '../../Services/AuthService';

var DatePicker = require("reactstrap-date-picker");


export default class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            name:'',
            dob:'',
            address:''
        };

       
    }

    handleEmail(text) {
        this.setState({ email: text.target.value });   
        console.log(text.target.value);     
    }
    handlePassword(text) {
        this.setState({ password: text.target.value });     
        console.log(text.target.value);   
    }
    handleName(text) {
        this.setState({ name: text.target.value });  
        console.log(text.target.value);      
    }
    handleDOB(date) {
        console.log(date);
        this.setState({ dob: date });          
    }
    handleAddress(text) {
         console.log(text.target.value);
        this.setState({ address: text.target.value });   
        console.log(text.target.value);     
    }
    register = async(e)=>{
        e.preventDefault();

        var registerParams = {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            dob: this.state.dob,
            address: this.state.address            
        }
        console.log(registerParams)
        try {
            var userInfo = await RegisterService(registerParams);
            console.log(userInfo)
            
        } catch(error) {
            //let errorMsg = (error.cause ? JSON.stringify(error.cause) : "Error in login request!");
            //NotificationManager.error(`${errorMsg}`, 'Login');
        }
    }

    render() {
        return (
            <div className="login-page">
                <Form onSubmit={this.register}>
                    <FormGroup row>
                        <Label for="email" sm={2}>Email:</Label>
                        <Col sm={10}>
                            <Input type="email" name="email" id="email" placeholder="Enter email" onChange={(text) => { this.handleEmail(text) }} required/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="password" sm={3}>Password:</Label>
                        <Col sm={9}>
                            <Input type="password" name="password" id="password" placeholder="password placeholder" onChange={(text) => { this.handlePassword(text) }} required/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="name" sm={2}>Name:</Label>
                        <Col sm={10}>
                            <Input type="name" name="name" id="nameid" placeholder="Enter name" onChange={(text) => { this.handleName(text) }}  required/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="dob" sm={2}>DOB</Label>
                        <Col sm={10}>
                            <DatePicker dateFormat="MM/DD/YYYY" onChange={(date) => { this.handleDOB(date) }} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="address" sm={2}>Address:</Label>
                        <Col sm={10}>
                            <Input type="textarea" name="address" id="address" onChange={(text) => { this.handleAddress(text) }}/>
                        </Col>
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
            </div>
        );
    }
}