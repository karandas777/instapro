import React, { Component } from 'react';
import {Redirect ,Route} from 'react-router-dom';

export default class PrivateRoute extends Component {
    render() {
        const token = localStorage.getItem('token');
        if (token === null || token === undefined || token === ""){
            return(<Redirect to="/login" />)
        }
        else{
            return(<Route {...this.props} />)
        }
    }
}
