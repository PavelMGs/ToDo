import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { database } from '../../firebase';
import { TaskType } from '../../interface/Tasks';
import { fetchList } from '../../redux/actions/actions';
import Task from '../Task/Task';

import s from './TaskList.module.scss'

interface iItem {
    item: {
        description: string,
        min: number,
        sec: number,
        id: number,
        added: number,
    }
}
// interface ITasks {
//         [

//         ]
// }

export interface IStore {
    list?: {
        taskList: any[]
    },
    user?: {
        UID: string | null
    }
}


const TaskList = () => {

    const [firstRun, setFirstRun] = useState(true);
    const dispatch = useDispatch();
    const store: IStore = useSelector((store) => store || { list: { taskList: [] } });
    const [filtredTasks, setFiltredTasks] = useState(store.list?.taskList || []);
    const [filter, setFilter] = useState('Все')


    const handleFilterButton = (filterName: string = '') => {

        let filtredArr = [];

        let newArr: TaskType[] | any[] = [];
        newArr = store.list ? newArr.concat(store.list.taskList) : [];

        switch (filterName) {
            

            case 'Активные задачи':
                filtredArr = newArr.filter(item => !item.done)
                setFiltredTasks(filtredArr);
                setFilter('Активные задачи');
                break;

            case 'Завершённые задачи':
                filtredArr = newArr.filter(item => item.done);
                setFiltredTasks(filtredArr);
                setFilter('Завершённые задачи');
                break;

            default: setFiltredTasks(newArr);
        }
    };


    let fireRes: any[] = [];

    useEffect(() => {

        database.ref(`${localStorage.getItem('user')}`).once('value')
            .then((res: any) => {
                fireRes = res.val();
                fireRes 
                ? dispatch(fetchList(fireRes))
                : console.log('no tasks')
                ;
                setFiltredTasks(fireRes);
            })
            .then(() => {
                
            });

    }, [])

    useEffect(() => {
        let newArr: TaskType[] | any[] = [];
        newArr = store.list ? newArr.concat(store.list.taskList) : [];

        handleFilterButton(filter)
    }, [store])

    



    return (
        <div className={s.root}>

            <div className={s.list}>
                {
                    
                    filtredTasks !== null ? filtredTasks?.map((item: TaskType) => {
                        return <Task key={item.id} props={item} />
                    }) : <div>Все задачи выполнены!</div>

                }
            </div>

            <div className={s.filter}>


                <button
                onClick={() => handleFilterButton()}
                >
                    Все задачи
                </button>


                <button
                onClick={() => handleFilterButton('Активные задачи')}
                >
                    Активные задачи
                </button>


                <button
                onClick={() => handleFilterButton('Завершённые задачи')}
                >
                    Завершённые задачи
                </button>

            </div>

        </div>
    )
}

export default TaskList;
