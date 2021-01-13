import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom'

import s from './App.module.scss';
import { IStore } from './components/TaskList/TaskList';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage';
import { setUid } from './redux/actions/actions';
import PrivateRoute from './utils/privateRoute'

const App = () => {

    const state: IStore = useSelector(state => state);``
    const dispatch = useDispatch()
    
    if(state.user?.UID) {
        dispatch(setUid(localStorage.getItem('user') || undefined))
    }
    
    return (
        <div className={s.root}>
            <Route path='/login' component={LoginPage} />
            <Route render={(props => {
                return (
                    <Switch>
                        <PrivateRoute path='/' exact component={HomePage}/>
                    </Switch>
                )
            })}/>
        </div>
    )
};

export default App;