import react, { Component } from 'react';
import Navbar from "../bar/navbar";
import { makeStyles } from '@material-ui/core/styles';
//import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { List, message, Avatar, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

import { GetAllActiveItems } from '../../Services/ItemService'
import { UserValidate } from '../../Services/AuthService'
import { AddNewbid } from '../../Services/BidService'
import { Container } from '@material-ui/core';
import { NotificationManager } from 'react-notifications';
import './FrontList.css';
import 'react-notifications/lib/notifications.css';
import { Button, Label, Input, Form, Toast, ToastBody, ToastHeader } from 'reactstrap';


export default class FrontList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedin: false,
            data: [],
            loading: false,
            hasMore: true,
            isUserLogged: false,
            bidValue: 0,
            show:true

        }
        this.isLoggedOnUser = this.isLoggedOnUser.bind(this);
        this.getAllItems();
    }

    async componentDidMount() {
        await this.isLoggedOnUser();
    }

    isLoggedOnUser = async () => {
        var isUserLogged = await UserValidate();
        this.setState({ isUserLogged: isUserLogged });
        console.log(isUserLogged)
    }

    getAllItems = async () => {
        try {
            var itemList = await GetAllActiveItems();
            console.log(itemList.data);
            this.setState({ data: itemList.data, loading: true });

        } catch (error) {

        }
    }

    addNewBid = async (val, title) => {

        try {

            var bidParams = {
                bidValue: this.state.bidValue,
                ItemId: val
            }
            let bidVal = await AddNewbid(bidParams);
            if (bidVal.data.success) {
                console.log(title);
                NotificationManager.success("New bid is added to the item - " + title);
            } else {
                NotificationManager.error("Failed to add bid for item - " + title);
            }
            console.log(bidVal.data.success);
        } catch (error) {

        }
    }

    handleBidVlaue(text) {
        this.setState({ bidValue: text.target.value });
        console.log(text.target.value);
    }

    render() {
      
        // const isLoggedIn = this.state.isUserLogged;
        // console.log(isLoggedIn)
        // let button;
        // if (isLoggedIn.data) {
        //     button = <div><button onClick={(val)=>this.addNewBid(val)} >Add bid</button> <input type="text" onChange={(text) => this.handleBidVlaue(text)} /></div>;
        // }
        return (
            <div >
                <div>
                    <Navbar />
                </div>
                <div className="center-title"> <h3 >Item list</h3></div>

                <div className="loading-container">
                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={this.getAllItems}
                        hasMore={!this.state.loading && this.state.hasMore}
                        useWindow={false}
                    >
                        <List
                            dataSource={this.state.data}
                            itemLayout="vertical"
                            renderItem={item => (
                                <List.Item key={item.itemId}>
                                    <List.Item.Meta
                                        title={<a href="https://ant.design">{item.itemTitle}</a>}
                                        description={item.itemSubTitle}
                                    // avatar={<Avatar src={item} shape="square" size={48} />}
                                    //avatar={ <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" shape="square" size={10}/>}

                                    />

                                    <div>{item.itemDescription}</div>
                                    {/* <div>{button} </div> */}
                                    <div>{this.state.isUserLogged ?
                                        <div>
                                            <button onClick={() => this.addNewBid(item.itemId, item.itemTitle)} >Add bid</button>
                                            <input type="number" name="bidValue" onChange={(text) => this.handleBidVlaue(text)} />
                                            {/* <Toast  show={this.state.show} delay={100} autohide>
                                                <ToastHeader>
                                                    Reactstrap
          </ToastHeader>
                                                <ToastBody>
                                                    This is a toast on a white background — check it out!
          </ToastBody>
                                            </Toast> */}
                                        </div>
                                        : <div></div>}</div>



                                </List.Item>
                            )}
                        >
                            {this.state.loading && this.state.hasMore && (
                                <div className="demo-loading-container">
                                    <Spin />
                                </div>
                            )}
                        </List>
                    </InfiniteScroll>

                </div>
            </div>
        );
    }
}

