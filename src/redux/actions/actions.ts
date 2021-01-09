import { TaskType } from "../../interface/Tasks";
import { ADD_TASK, FETCH_LIST, GET_LIST, SET_DONE, SET_UID } from "./actionsName"

export const fetchList = (fireResponse: TaskType[]) => ({
    type: FETCH_LIST,
    payload: fireResponse,
});

export const getList = () => ({
    type: GET_LIST
});

export const addTask = (payload: TaskType) => ({
    type: ADD_TASK,
    payload,
})

export const setDone = (payload: number) => ({
    type: SET_DONE,
    payload
})

export const setUid = (payload: string | undefined) => ({
    type: SET_UID,
    payload,
})