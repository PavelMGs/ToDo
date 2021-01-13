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
    const [filter, setFilter] = useState('Все');
    const [filterFocused, setFilterFocused] = useState(['focused', 'not_focused', 'not_focused']);


    const handleFilterButton = (filterName: string = '') => {

        let filtredArr = [];

        let newArr: TaskType[] | any[] = [];
        newArr = store.list ? newArr.concat(store.list.taskList) : [];
console.log('### filter', filterName)
        switch (filterName) {
            

            case 'Активные задачи':
                filtredArr = newArr.filter(item => !item.done)
                setFiltredTasks(filtredArr);
                setFilter('Активные задачи');
                setFilterFocused(['not_focused', 'focused', 'not_focused'])
                break;

            case 'Завершённые задачи':
                filtredArr = newArr.filter(item => item.done);
                setFiltredTasks(filtredArr);
                setFilter('Завершённые задачи');
                setFilterFocused(['not_focused', 'not_focused', 'focused'])
                break;

            default: 
                setFiltredTasks(newArr);
                setFilter('Все');
                setFilterFocused(['focused', 'not_focused', 'not_focused'])
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
                    
                    filtredTasks?.length ? filtredTasks?.map((item: TaskType) => {
                        return <Task key={item.id} props={item} />
                    }) : <div className={s.no_tasks}>Тут нет задач...</div>

                }
            </div>

            <div className={s.filter}>


                <button
                onClick={() => handleFilterButton()}
                className={s[filterFocused[0] as keyof typeof s]}
                >
                    Все задачи
                </button>


                <button
                onClick={() => handleFilterButton('Активные задачи')}
                className={s[filterFocused[1] as keyof typeof s]}
                >
                    Активные задачи
                </button>


                <button
                onClick={() =>{console.log('TikTak'); handleFilterButton('Завершённые задачи')}}
                className={s[filterFocused[2] as keyof typeof s]}
                >
                    Завершённые задачи
                </button>

            </div>

        </div>
    )
}

export default TaskList;
