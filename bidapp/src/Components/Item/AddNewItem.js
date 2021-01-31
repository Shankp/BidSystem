import react, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AddItemService, UploadImage, GetItemsById ,UpdateItemService } from '../../Services/ItemService';
import Navbar from "../bar/navbar";
import { withRouter } from 'react-router';
import './AddItem.css';
import ImageUploader from 'react-images-upload';
import Dropdown from 'react-dropdown';
//import itemStatusForAdmin from "./../../models/ItemStatusType";
import Select from 'react-select'

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
            itemStatus: '',
            itemStatusLabel: '',
            modal: true,
            pictures: [],
            image: null,
            isUpdate: false,
            itemId: null,
            isDisabled:false
        };
        this.toggle = this.toggle.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.loadItemDetails = this.loadItemDetails.bind(this);

    }



    componentDidMount() {

        // this.setState((state, props) => ({
        //     isUpdate:this.props.isUpdate , itemId: this.props.itemId
        //   }));

        this.setState({ isUpdate: this.props.isUpdate, itemId: this.props.itemId }, () => {
            console.log(this.state.updateItemId, 'dealersOverallTotal1');
            this.loadItemDetails(this.state.itemId);
        });


        //   console.log(this.props.isUpdate)
        //   console.log(this.state.itemId)

        // this.setState({ isUpdate: this.props.isUpdate, itemId: this.props.itemId });
        // if (this.state.isupdate) {
        //     this.loadItemDetails(this.state.itemId);
        // }
    }

    loadItemDetails = async (itemId) => {
        var itemInfo = await GetItemsById(itemId);
        console.log(itemInfo)
        this.setState({
            title: itemInfo.data.itemTitle,
            subTitle: itemInfo.data.itemSubTitle,
            moreDetails: itemInfo.data.itemDescription,
            expireTime: itemInfo.data.expireTime,
            startingBid: itemInfo.data.startingBid,
            itemStatus: itemInfo.data.itemStatus
        });

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
    handleItemStatus(text) {
        console.log(text)
        if (text != null){
            this.setState({ itemStatus: text.value, itemStatusLabel: text.label });
        }
    }
    onDrop(picture) {
        console.log(picture);
        // this.setState({
        //     pictures: this.state.pictures.concat(picture),
        // });
        this.setState({
            image: picture
        });

    }
    saveItem = async (e) => {
        e.preventDefault();

        try {
            if (this.state.isUpdate) {
                var itemParams = {
                    itemId:this.state.itemId,
                    title: this.state.title,
                    subTitle: this.state.subTitle,
                    moreDetails: this.state.moreDetails,
                    expireTime: this.state.expireTime,
                    startingBid: this.state.startingBid,
                    itemStatus: this.state.itemStatus,
                    image: this.state.pictures
                }
                var update =  await UpdateItemService(itemParams);
                console.log(update)


            } else {
                var itemParams = {
                    title: this.state.title,
                    subTitle: this.state.subTitle,
                    moreDetails: this.state.moreDetails,
                    expireTime: this.state.expireTime,
                    startingBid: this.state.startingBid,
                    itemStatus: 1,
                    image: this.state.pictures
                }
                var userInfo = await AddItemService(itemParams);
                if (userInfo != null) {
                    // this.props.history.push({
                    //     pathname: '/LoggedUserList',
                    //     state: { isLoggedin: true }
                    // });
                    console.log(userInfo)
                }

            }

            //TODO:image saving
            //var imageUpload = await UploadImage(this.state.image);//,"testFIle");
            this.sendData(this.state.modal);

        } catch (error) {
            //let errorMsg = (error.cause ? JSON.stringify(error.cause) : "Error in login request!");
            //NotificationManager.error(`${errorMsg}`, 'Login');
        }
    }

    render() {

        const itemStatusForAdmin = [
            {
                value: '1', label: 'NEW'
            },
            {
                value: '2', label: 'ACTIVE'
            }
        ];
        //const defaultOption = itemStatusForAdmin[0];
        var selected = null
        console.log(this.state.itemStatus)
        if (this.state.itemStatus >= 0) {
            selected = itemStatusForAdmin.filter(st =>
                st.value == this.state.itemStatus
            )
        }
        else if(this.state.itemStatus==null){
            selected=null;
        }

        if(this.state.isUpdate){
            this.state.isDisabled=false;
        }
        else{
            this.state.isDisabled=true;
        }
        return (


            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader>
                    {this.state.isUpdate
                        ?
                        <div>Update Item</div>
                        :
                        <div>New Bid Item</div>}

                </ModalHeader>
                <ModalBody>
                    <div className="form-page">
                        {/* <div>
                    <Navbar />
                </div> */}
                        <Form onSubmit={this.saveItem}>
                            <FormGroup row>
                                <Label for="title" sm={2}>Title:</Label>
                                <Col sm={10}>
                                    <Input type="text" name="title" id="title" value={this.state.title} placeholder="Enter Item name" onChange={(text) => { this.handleTitle(text) }} required />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="subtitle" sm={3}>Subtitle:</Label>
                                <Col sm={9}>
                                    <Input type="text" name="subtitle" id="subtitle" value={this.state.subTitle} placeholder="Enter Item sub name" onChange={(text) => { this.handleSubTitle(text) }} required />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="info" sm={2}>More Information:</Label>
                                <Col sm={10}>
                                    <Input type="text" name="info" id="info" value={this.state.moreDetails} placeholder="Enter more info..." onChange={(text) => { this.handleInfo(text) }} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="ExDate" sm={2}>Expiration Date:</Label>
                                <Col sm={10}>
                                    <DatePicker dateFormat="MM/DD/YYYY" value={this.state.expireTime} onChange={(date) => { this.handleExpireDate(date) }} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="starting Bid" sm={2}>Starting Bid:</Label>
                                <Col sm={10}>
                                    <Input type="number" name="startingBid" value={this.state.startingBid} id="startingBid" onChange={(text) => { this.handleStartingBid(text) }} />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label for="Status" sm={2}>Status:</Label>
                                <Col sm={10}>
                                    <Select name="status" id="status"
                                        value={selected}
                                        onChange={(text) => { this.handleItemStatus(text) }}
                                        isClearable={true}
                                        isDisabled={this.state.isDisabled}
                                        options={itemStatusForAdmin}
                                        placeholder="Select Item Status">
                                    </Select>
                                </Col>
                            </FormGroup>
                            {this.state.isUpdate
                                ?
                                <div></div>
                                :
                                <FormGroup row>
                                    <ImageUploader
                                        withIcon={true}
                                        buttonText='Choose images'
                                        onChange={this.onDrop}
                                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                        maxFileSize={5242880}
                                    />
                                    {/* <Input type="image" onChange={(text) => {this.onDrop(text) }} />
                         */}
                                </FormGroup>

                            }
                            {this.state.isUpdate
                                ?
                                <Button >Update</Button>
                                :
                                <Button >Submit</Button>
                            }

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