import React, { useEffect, useState } from 'react';
import { TaskType } from '../../interface/Tasks';
import { IStore } from '../TaskList/TaskList';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, fetchList, setDone } from '../../redux/actions/actions';

import s from './Task.module.scss';
import Run from './assets/run.png';
import Stop from './assets/stop.png';
import Delete from './assets/delete.png';
import Edit from './assets/edit.png'

interface IProps {
    props: TaskType,
}

const Task: React.FC<IProps> = ({ props }) => {
    const [isRunned, setIsRunned] = useState(false);
    const [runClass, setRunClass] = useState('run')
    const [timeAgoState, setTimeAgoState] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(props.description)
    const store: IStore = useSelector((store) => store || { list: { taskList: [] } });
    const [taskList, setTaskList] = useState(store.list?.taskList);
    const [intervalB, setintervalB] = useState(true)
    const dispatch = useDispatch();
    let { added, min, sec, description } = props;
    const [firstRun, setFirstRun] = useState(true)

    useEffect(() => {
        setTaskList(store.list?.taskList);
    }, [store])

    // const handleRunStopClick = () => {
        
    // }

    const handleRunImage = () => {
        runClass === 'run'
        ? setRunClass('stop')
        : setRunClass('run');
        setIsRunned(!isRunned);
    }

    const handleDeleteClick = () => {
        let newArr = taskList ? taskList : [];
        newArr?.map((item: TaskType, index) => {
            if (item.id === props.id) {
                newArr?.splice(index, 1);
                dispatch(fetchList(newArr))
            };
        })
    }

    const handleEditClick = () => {
        if(isEditing) {
            props.description = editValue;

        let newArr = taskList ? taskList : [];
        newArr?.map((item: TaskType, index) => {
            if (item.id === props.id) {
                newArr[index].description = props.description;
                dispatch(fetchList(newArr))
            };
        })
        }
        setIsEditing(!isEditing)
    }

    useEffect(() => {
        if (firstRun) {
            let interval = setInterval(() => {
                let timeAgo = Date.now() - props.added;
                let seconds = Math.floor(timeAgo / 1000);
                let minutes = Math.floor(seconds / 60);
                let hours = Math.floor(minutes / 60);
                let days = Math.floor(hours / 24);

                if (timeAgo === 0) {
                    return;
                } else if (seconds < 60) {
                    setTimeAgoState(`Создано ${seconds} секунд назад`);
                } else if (seconds >= 60 && seconds < 3600) {
                    setTimeAgoState(`Создано ${minutes} min назад`);
                } else if (minutes >= 60 && hours < 24) {
                    setTimeAgoState(`Создано ${hours} часов назад`);
                } else if (hours >= 24 && days < 7) {
                    setTimeAgoState(`Создано ${days} дней назад`);
                } else if (days > 7) {
                    setTimeAgoState(`Чё ждём?`)
                }
                // console.log("min: ", min, "sec", sec, 'added:', props.added)
            }, 1000)
            setFirstRun(false);
        }
    }, [])
    // useEffect(() => {console.log('дыщ')}, [props.sec, props.min])

    useEffect(() => {
        if(isRunned) {
            const interval = setInterval(() => {
                if(props.sec > 0) {
                    props.sec = props.sec - 1; 
                    console.log(props.  sec)
                } else if (props.sec === 0 && props.min > 0) {
                    --props.min;
                    props.sec = 59;
                }

                let newArr = taskList ? taskList : [];

                newArr?.map((item: TaskType, index) => {
                    if (item.id === props.id) {
                        newArr[index].min = props.min;
                        newArr[index].sec = props.sec;
                        dispatch(fetchList(newArr))
                    }
                });

                clearInterval(interval);
                setintervalB(!intervalB)
            }, 1000)
        } 
    }, [isRunned, intervalB])

    if (isEditing) {
        
        return (
            <div className={s.root}>

                <input
                    type="text"
                    value={editValue ? editValue : ''}
                    className={s.edit_label}
                    onChange={(e) => setEditValue(e.target.value)}
                />

                <div className={s.settings}>

                    
                    <button 
                        type="button" 
                        onClick={() => handleEditClick()}
                        className={s.edit}
                    />

                </div>
            </div>
        )
    }

    return (
        <div className={s.root}>
            
            <label className={s.label}>
                <input
                    type="checkbox"
                    checked={props.done}
                    className={s.checkbox}
                    onChange={() => {
                        store.list?.taskList.map((item, index) => {
                            if (item.id === props.id) {
                                console.log('CHECk')
                                dispatch(setDone(item.id))
                            }
                        })
                    }}
                />

                <span className={s.custom_check}></span>
                
                {props.description}
            </label>

            <div className={s.next}>
                <button
                    className={s[runClass as keyof typeof s]}
                    onClick={() => {handleRunImage()}}
                />
            </div>

            <div className={s.counter   }>
                {props.min}:{props.sec}
            </div>

            <div>
                {timeAgoState}
            </div>

            <div className={s.settings}>

            <button 
                        type="button" 
                        onClick={() => handleDeleteClick()}
                        className={s.delete}
                    />
                    
                    <button 
                        type="button" 
                        onClick={() => handleEditClick()}
                        className={s.edit}
                    />
                   

            </div>
        </div>
    )
};

export default Task;
