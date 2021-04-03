import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTasksActionType = {
  type: "REMOVE-TASKS"
  todolistId: string
  tasksId: string
}

export type AddTaskActionType = {
  type: "ADD-TASK"
  title: string
  todolistId: string
}

export type ChaneTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS"
  taskId: string
  todolistId: string
  isDone: boolean
}

export type ChaneTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE"
  taskId: string
  todolistId: string
  title: string
}

type ActionType =
  RemoveTasksActionType
  | AddTaskActionType
  | ChaneTaskStatusActionType
  | ChaneTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType

export const removeTaskAC = (tasksId: string, todolistId: string): RemoveTasksActionType => {
  return {type: "REMOVE-TASKS", todolistId, tasksId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
  return {type: "ADD-TASK", title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChaneTaskStatusActionType => {
  return {type: "CHANGE-TASK-STATUS", taskId, todolistId, isDone}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChaneTaskTitleActionType => {
  return {type: "CHANGE-TASK-TITLE", taskId, todolistId, title}
}

const initialState: TasksStateType = {

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASKS": {
      const stateCopy = {...state}
      const tasks = state[action.todolistId]
      const filteredTasks = tasks.filter(t => t.id !== action.tasksId)
      stateCopy[action.todolistId] = filteredTasks
      return stateCopy
    }
    case "ADD-TASK": {
      const stateCopy = {...state}
      const tasks = state[action.todolistId]
      const newTask = {id: v1(), title: action.title, isDone: false}
      const newTasks = [newTask, ...tasks]
      stateCopy[action.todolistId] = newTasks
      return stateCopy
    }
    case "CHANGE-TASK-STATUS": {
      const stateCopy = {...state}
      let tasks = stateCopy[action.todolistId];
      let task = tasks.find(t => t.id === action.taskId);
      if (task) {
        task.isDone = action.isDone;
      }
      return stateCopy
    }
    case "CHANGE-TASK-TITLE": {
      const stateCopy = {...state}
      let tasks = stateCopy[action.todolistId];
      let task = tasks.find(t => t.id === action.taskId);
      if (task) {
        task.title = action.title;
      }
      return stateCopy
    }
    case "ADD-TODOLIST": {
      const stateCopy = {...state}
      stateCopy[action.todolistId] = []
      return stateCopy
    }
    case "REMOVE-TODOLIST": {
      const stateCopy = {...state}
      delete stateCopy[action.id]
      return stateCopy
    }
    default:
     return state
  }
}