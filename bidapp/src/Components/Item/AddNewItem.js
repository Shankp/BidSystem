import react, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AddItemService } from '../../Services/ItemService';
import Navbar from "../bar/navbar";
import { withRouter } from 'react-router';
import './AddItem.css';

var DatePicker = require("reactstrap-date-picker");

export class AddNewItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            subTitle: '',
            moreDetails: '',
            expireTime: '',
            startingBid: '',
            modal: true
        };
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        // this.setState({
        //     modal: !this.state.modal
        // });
        this.sendData(this.state.modal);
    }

    sendData = (closeModal) => {

        this.props.onHide(closeModal);

    }
    handleTitle(text) {
        this.setState({ title: text.target.value });       
    }
    handleSubTitle(text) {
        this.setState({ subTitle: text.target.value });       
    }
    handleInfo(text) {
        this.setState({ moreDetails: text.target.value });       
    }
    handleExpireDate(date) {        
        this.setState({ expireTime: date });
    }
    handleStartingBid(text) {
        this.setState({ startingBid: text.target.value });
        console.log(text.target.value);
    }

    saveItem = async (e) => {
        e.preventDefault();

        var itemParams = {
            title: this.state.title,
            subTitle: this.state.subTitle,
            moreDetails: this.state.moreDetails,
            expireTime: this.state.expireTime,
            startingBid: this.state.startingBid,
            itemStatus: 1
        }
        
        try {
            var userInfo = await AddItemService(itemParams);
            if (userInfo != null) {
                // this.props.history.push({
                //     pathname: '/LoggedUserList',
                //     state: { isLoggedin: true }
                // });
                console.log(userInfo)
            }
            this.sendData(this.state.modal);

        } catch (error) {
            //let errorMsg = (error.cause ? JSON.stringify(error.cause) : "Error in login request!");
            //NotificationManager.error(`${errorMsg}`, 'Login');
        }
    }

    render() {
        return (
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader>New Bid Item</ModalHeader>
                <ModalBody>
                    <div className="form-page">
                        {/* <div>
                    <Navbar />
                </div> */}
                        <Form onSubmit={this.saveItem}>
                            <FormGroup row>
                                <Label for="title" sm={2}>Title:</Label>
                                <Col sm={10}>
                                    <Input type="text" name="title" id="title" placeholder="Enter Item name" onChange={(text) => { this.handleTitle(text) }} required />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="subtitle" sm={3}>Subtitle:</Label>
                                <Col sm={9}>
                                    <Input type="text" name="subtitle" id="subtitle" placeholder="Enter Item sub name" onChange={(text) => { this.handleSubTitle(text) }} required />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="info" sm={2}>More Information:</Label>
                                <Col sm={10}>
                                    <Input type="text" name="info" id="info" placeholder="Enter more info..." onChange={(text) => { this.handleInfo(text) }} required />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="ExDate" sm={2}>Expiration Date:</Label>
                                <Col sm={10}>
                                    <DatePicker dateFormat="MM/DD/YYYY" value = {this.state.expireTime} onChange={(date) => { this.handleExpireDate(date) }} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="starting Bid" sm={2}>Starting Bid:</Label>
                                <Col sm={10}>
                                    <Input type="number" name="startingBid" id="startingBid" onChange={(text) => { this.handleStartingBid(text) }} />
                                </Col>
                            </FormGroup>
                            <Button >Submit</Button>
                        </Form>
                    </div>
                </ModalBody>
                <ModalFooter>

                    <Button color='secondary' onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}
export default AddNewItem;
//export default withRouter(AddNewItem)