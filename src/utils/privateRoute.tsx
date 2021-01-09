import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { IStore } from '../components/TaskList/TaskList';

interface IPrivateProps {
    component: any
    path: string
    exact?: any
}

const PrivateRoute = (props: IPrivateProps) => {

    const store: IStore = useSelector(store => store);

    const { component: Component, ...rest } = props;
        return (
            <Route 
                {...rest}
                render={ props => localStorage.getItem('user')
                ? <Component {...props} />
                : <Redirect to='/login' />}
            />
        )
    }


export default PrivateRoute;
