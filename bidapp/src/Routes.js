import React, { useEffect } from 'react';
import { BrowserRouter, useHistory } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import FrontList from './Components/Item/FrontList'
import LogOut from './Components/Login/LogOut'

function CheckLogOnStatus(){
    let token= sessionStorage.getItem('token');
    //console.log(token)
    if(token)
    {
        return true;
    }
return false;
}

const PrivateRoute = ({ component: Component, ...rest }) => {  

    return (
        <Route {...rest} render={(props) => (
            (CheckLogOnStatus())
                ? (<Component {...props} />)
                : (<Redirect to={{
                    pathname: '/Login',
                    state: { from: props.location }
                }} />)
        )} />);
}

const Routes = () => {
    console.log('Application running in ' + process.env.NODE_ENV + ' mode');  
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/Login"><Login /></Route>               
                <Route path='/Register' component={Register} />                              
                <Route path='/' component={FrontList} />
                <PrivateRoute path='/LoggedUserList' component={FrontList} />
              
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;