import { Component } from 'react';
import Navbar from "../bar/navbar";
import { List, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

import { GetAllActiveItems, GetItemsByStatus } from '../../Services/ItemService'
import { UserValidate, GetUserType } from '../../Services/AuthService'
import { AddNewbid } from '../../Services/BidService'
import { NotificationManager } from 'react-notifications';
import './FrontList.css';
import 'react-notifications/lib/notifications.css';
import itemStatus from "./../../models/ItemStatusType";
import Divider from '@material-ui/core/Divider';
import { AddNewItem } from '../Item/AddNewItem';
import Countdown from "react-countdown";


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
            show: true,
            userType: null,
            addItemModalShow: false,
            isUpdate: false,
            updateItemId: null

        }
        this.isLoggedOnUser = this.isLoggedOnUser.bind(this);
        this.getUserType = this.getUserType.bind(this);
        this.handleOnHide = this.handleOnHide.bind(this);
    }


    async componentDidUpdate() {

    }

    async componentDidMount() {
        await this.isLoggedOnUser();
        await this.getUserType();
        await this.getAllItems();
    }

    isLoggedOnUser = async () => {
        try {
            var isUserLogged = await UserValidate();
            this.setState({ isUserLogged: isUserLogged });
        } catch (error) {

        }
    }

    getAllItems = async () => {
        try {
            console.log(this.state.userType)
            let itemList;
            if (this.state.userType == 1) {
                var statusList = itemStatus.NEW + "," + itemStatus.ACTIVE;
                itemList = await GetItemsByStatus(statusList);
            }
            else if (this.state.userType == 2) {
                var statusList = itemStatus.ACTIVE;
                itemList = await GetItemsByStatus(statusList);
            } else {
                itemList = await GetAllActiveItems();
            }

            this.setState({ data: itemList.data, loading: true });
            console.log(this.state.data);

        } catch (error) {

        }
    }

    handleOnHide() {
        this.setState({
            addItemModalShow: false
        })
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

    getUserType = async () => {
        try {
            var userType = await GetUserType();
            this.setState({ userType: userType.data });
        } catch (error) {
            if (error.statuscode === 401) {
                console.log("user not logged in.");
            }
        }
    }

    handleBidVlaue(text) {
        this.setState({ bidValue: text.target.value });
    }

    goToEditItem = async (itemId) => {
        this.setState({
            addItemModalShow: true,
            isUpdate: true
        });
        this.setState({ updateItemId: itemId }, () => {
            console.log(this.state.updateItemId, 'dealersOverallTotal1');
        });
        console.log(this.state.updateItemId)
    }



    render() {
        const Completionist = () => <span>Item is no longer valid for bidding.</span>;

        
        const renderer = ({ days ,hours, minutes, seconds, completed }) => {
            if (completed) {
               
                return <Completionist />;
            } else {                
                return (
                    <span>
                      {days} days {hours}h: {minutes}m: {seconds}s
                    </span>
                );
            }
        };

        return (
            <div >
                <div>
                    <Navbar />
                </div>

                {this.state.data == null || this.state.data.length == 0
                    ?
                    <div className="center-title">
                        <h3>Oops. No Items to bid  :-( </h3>
                    </div>
                    :
                    <div>
                        <div className="center-title">
                            <h3 >Item list</h3>
                        </div>

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
                                                title={item.itemTitle}
                                                description={item.itemSubTitle}

                                            />
                                            <div>
                                                {item.itemDescription}
                                            </div>
                                            {
                                                item.maxBidValue != 0 ?
                                                    <div> Highest Bid :(LKR) {item.maxBidValue}</div> :
                                                    <div></div>
                                            }


                                            <div>{this.state.isUserLogged ?
                                                <div>
                                                    {this.state.userType == 2 && this.state.userType != null ?
                                                        <div>
                                                            <button onClick={() => this.addNewBid(item.itemId, item.itemTitle)} >Add bid</button>
                                                            <input type="number" name="bidValue" onChange={(text) => this.handleBidVlaue(text)} />
                                                        </div>
                                                        :
                                                        <div>
                                                            {
                                                                item.itemStatus == 1 ?
                                                                    <div>Status : New</div>
                                                                    :
                                                                    <div>Status : Active</div>
                                                            }
                                                            <button onClick={() => this.goToEditItem(item.itemId)} >Edit bid</button>
                                                        </div>
                                                    }

                                                    {/* <Toast  show={this.state.show} delay={100} autohide>
                                            <ToastHeader>
                                                Reactstrap
                                               </ToastHeader>
                                            <ToastBody>
                                                This is a toast on a white background — check it out!
                                                  </ToastBody>
                                        </Toast> */}

                                                </div>
                                                : <div></div>
                                            }
                                            Valid within : 
                                            {console.log(item.expireTime)}
                                                <Countdown
                                                    date={item.expireTime}
                                                    intervalDelay={0}
                                                    precision={3}
                                                    renderer={renderer}
                                                />
                                            </div>
                                            <Divider style={{ backgroundColor: "lightblue", margin: "75px 0px" }} />
                                        </List.Item>

                                    )}
                                >

                                    {this.state.loading && this.state.hasMore && (
                                        <div className="loading-container2">
                                            <Spin />
                                        </div>
                                    )}
                                </List>
                            </InfiniteScroll>
                        </div>
                    </div>
                }
                {this.state.addItemModalShow ? <AddNewItem
                    show={this.state.addItemModalShow}
                    isUpdate {...this.state.isUpdate}
                    onHide={this.handleOnHide}
                    itemId={this.state.updateItemId}
                /> : null}
            </div>
        );
    }
}

