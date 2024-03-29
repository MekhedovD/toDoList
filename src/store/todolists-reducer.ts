import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST"
  id: string
}

export type AddTodolistActionType = {
  type: "ADD-TODOLIST"
  title: string
  todolistId: string
}

export type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE"
  title: string,
  id: string
}

export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER"
  filter: FilterValuesType,
  id: string
}

type ActionType =
  RemoveTodolistActionType |
  AddTodolistActionType |
  ChangeTodolistTitleActionType |
  ChangeTodolistFilterActionType

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return { type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
  return { type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
  return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title}
}

export const changeTodolistFilterAC = (filter: FilterValuesType, id: string): ChangeTodolistFilterActionType => {
  return {type: "CHANGE-TODOLIST-FILTER", filter: filter, id: id}
}

const initialState: Array<TodolistType> = [

]

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionType): Array<TodolistType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter(tl => tl.id !== action.id)
    }
    case "ADD-TODOLIST": {
      return [{
        id: action.todolistId,
        title: action.title,
        filter: "all"
      }, ...state]
    }
    case "CHANGE-TODOLIST-TITLE": {
      return state.map(tl => {
        if (tl.id === action.id) {
          return {...tl, title: action.title}
        } else {
          return tl
        }
      })
    }
    case "CHANGE-TODOLIST-FILTER": {
      return state.map(tl => {
        if (tl.id === action.id) {
          return {...tl, filter: action.filter}
        } else {
          return tl
        }
      })
    }
    default:
      return state
  }
}