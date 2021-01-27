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
import { Container } from '@material-ui/core';
import './FrontList.css';


export default class FrontList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedin: false,
            data: [],
            loading: false,
            hasMore: true,
            isUserLogged:false
        }
        this.isLoggedOnUser = this.isLoggedOnUser.bind(this);
        this.getAllItems();
    }

    async componentDidMount(){
        await this.isLoggedOnUser();
    }

    isLoggedOnUser = async () => {
        var isUserLogged = await UserValidate();
        this.setState({isUserLogged:isUserLogged});
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


    render() {
        const isLoggedIn = this.state.isUserLogged;
        console.log(isLoggedIn) 
        let button;
        if (isLoggedIn.data) {
          button = <button onClick={this.handleLogoutClick} >Add bid</button>;
        }
        return (
            <div >
                 <div>
                    <Navbar />
                </div>
                <div className="center-title"> <h1 >Item list</h1></div>

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
                            renderItem={item => (
                                <List.Item key={item.id}>
                                    <List.Item.Meta
                                        title={<a href="https://ant.design">{item.itemTitle}</a>}
                                        description={item.itemSubTitle}
                                    />
                                    <div>{item.itemDescription}</div>

                                    {button}
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

