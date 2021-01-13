import React from 'react';
import NewTask from '../../components/NewTask/NewTask';
import TaskList, { IStore } from '../../components/TaskList/TaskList';

import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import s from './HomePage.module.scss';
import { setUid } from '../../redux/actions/actions';


const HomePage = () => {

    const dispatch = useDispatch();
    
    return (
        <div className={s.root}>

            <Button type="primary" className={s.logout} onClick={() => {
                localStorage.removeItem('user');
                dispatch(setUid(undefined));
            }}>
                Logout
            </Button>

            <header className={s.header}>Че делать?</header>

            <div className={s.taskBox}>
                <NewTask />
                <TaskList />
            </div>
        </div>
    )
};

export default HomePage;