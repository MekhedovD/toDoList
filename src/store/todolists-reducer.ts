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
  return { type: "CHANGE-TODOLIST-TITLE", id: id, title: title}
}

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
  return { type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter }
}

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter(tl => tl.id !== action.id)
    }
    case "ADD-TODOLIST": {
      return [...state, {
        id: action.todolistId,
        title: action.title,
        filter: "all"
      }]
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
      throw new Error("I don't understand this type")
  }
}