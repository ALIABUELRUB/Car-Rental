import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import asyncComponent from '../hoc/asyncComponent/asyncComponent';

// import SignUp from './Auth/SignUp/SignUp';
import Signin from '../containers/Auth/Auth';

const asyncSignUp = asyncComponent(() => {
    return import('./Auth/SignUp/SignUp');
})


const main = (props) => {

    return (
        <>
            <Switch>
                <Route path="/SignUp" exact render={() => <asyncSignUp state={props.state} />} />
                <Route path="/" exact render={() => <Signin state={props.state} />} />
                {/* {this.props.state.authReducer.token === null ? <Redirect to="/" /> : null} */}
            </Switch>
        </>
    );

}



export default main;