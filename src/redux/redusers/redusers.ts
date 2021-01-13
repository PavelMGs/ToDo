import TaskList from "../../components/TaskList/TaskList";
import { ADD_TASK, FETCH_LIST, GET_LIST, SET_DONE, SET_UID } from "../actions/actionsName";

const INITIAL_STATE = {
    taskList: [],
};

type TaskType = {
    description: string,
    min: number,
    sec: number,
    id: number,
    added: number,
    done: boolean,
}

interface IListAction {
    type: string
    payload?: TaskType
}

interface IUserAction {
    type: string
    payload?: string
}

export const listReducer = (state: {taskList: TaskType[]} = INITIAL_STATE, action: IListAction) => {
    switch(action.type) {
        case FETCH_LIST:
            return {
                ...state,
                taskList: Array.isArray(action.payload) ? action.payload : [action.payload]
            }
            
        case GET_LIST:
            return state;

        case ADD_TASK:
            return {
                ...state,
                taskList: action.payload ? (state.taskList ? state.taskList.concat([action.payload]): [action.payload]): null
            }

        case SET_DONE: 
            let newArr = state.taskList.map((item) => {
            //@ts-ignore
            if(item.id === action.payload) {
                item.done = !item.done;
            }
            return item;
        })
            return {
                ...state,
                taskList: newArr
            }

        default: return state;
    }
}

export const userReducer = (state = {UID: null}, action: IUserAction) => {
    switch(action.type) {
        case SET_UID :
            return {
                ...state,
                UID: action.payload ? action.payload : null
            }

        default: return state;
    }
}