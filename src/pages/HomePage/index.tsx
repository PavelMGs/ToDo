import React from 'react';
import NewTask from '../../components/NewTask/NewTask';
import TaskList from '../../components/TaskList/TaskList';

import s from './HomePage.module.scss';


const HomePage = () => {

    
    return (
        <div className={s.root}>
            <header className={s.header}>Че делать?</header>
            <div className={s.taskBox}>
                <NewTask />
                <TaskList />
            </div>
        </div>
    )
};

export default HomePage;