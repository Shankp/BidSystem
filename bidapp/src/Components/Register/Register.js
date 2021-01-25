import react, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './Register.css';
var DatePicker = require("reactstrap-date-picker");

export default class Register extends Component {
    render() {
        return (
            <div className="login-page">
                <Form>
                    <FormGroup row>
                        <Label for="exampleEmail" sm={2}>Email:</Label>
                        <Col sm={10}>
                            <Input type="email" name="email" id="exampleEmail" placeholder="Enter email" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="examplePassword" sm={3}>Password:</Label>
                        <Col sm={9}>
                            <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="name" sm={2}>Name:</Label>
                        <Col sm={10}>
                            <Input type="name" name="name" id="nameid" placeholder="Enter name" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="dob" sm={2}>DOB</Label>
                        <Col sm={10}>
                            <DatePicker dateFormat="MM/DD/YYYY" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="address" sm={2}>Address:</Label>
                        <Col sm={10}>
                            <Input type="textarea" name="address" id="address" />
                        </Col>
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
            </div>
        );
    }
}