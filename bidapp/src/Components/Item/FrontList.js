import react, { Component } from 'react';
import Navbar from "../bar/navbar";

export default class FrontList extends Component{
constructor(props){
    super(props);
    this.state={        
        isLoggedin:false  
    }
}
    render(){
        return(
            <div><h1>front list</h1></div>
        );
    }
}

