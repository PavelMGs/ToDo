import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { database } from '../../firebase';
import s from './NewTask.module.scss';
import { IStore }from '../TaskList/TaskList'
import { addTask, fetchList, getList } from '../../redux/actions/actions';



const NewTask = () => {
    const [value, setValue] = useState('');
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [submit, setSubmit] = useState(false);
    const [isFirstRun, setIsFirstRun] = useState(true)
    const store: IStore = useSelector((store) => store || {list: {taskList: []}});
    const dispatch = useDispatch();
    

    const [firstUpdate, setfirstUpdate] = useState(true)

    useEffect(() => {
        if(isFirstRun) {
            setIsFirstRun(false);
            return;
        }
        const newArr = store.list?.taskList;

            database.ref(`${localStorage.getItem('user')}`).set(
               newArr
            );
    }, [store])

    
    useEffect(() => {

        if(firstUpdate){
            setfirstUpdate(false);
        } else if(value === undefined || value === "") {
            alert("Введите описание задачи!")
        } else if(minutes <= 0)  {
            alert("Введите время в минутах")
        } else if(seconds <= 0) {
            alert("Введите время в секундах")
        } else {
            console.log(dispatch(addTask({
                description: value,
                min: minutes,
                sec: seconds,
                id: Date.now(),
                added: Date.now(),
                done: false,
            })))
            
            
            setValue('');
            setMinutes(0);
            setSeconds(0);
        }

        const handlerEvent = (e: KeyboardEvent) => {
            if(e.key== 'Enter') {
                setSubmit(!submit);
            }
        }

        document.getElementById('root')?.addEventListener('keyup', handlerEvent);
        return () => document.getElementById('root')?.removeEventListener('keyup', handlerEvent )
        
    }, [submit])

    
    return (
        <div className={s.root}>
                    <input 
                        id='inputTask' 
                        type="text" 
                        placeholder="следующий шаг в захвате мира" 
                        className={s.textInput}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Min"
                        className={s.smallInput}
                        value={minutes}
                        onChange={(e) => setMinutes(+e.target.value)}
                     />
                     <input
                        type="number"
                        placeholder="Sec"
                        className={s.smallInput}
                        value={seconds}
                        onChange={(e) => {setSeconds(+e.target.value)}}
                     />
                </div>
    )
}

export default NewTask;