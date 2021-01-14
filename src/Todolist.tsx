import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EdiableSpan} from "./EditableSpan";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  id: string
  title: string
  filter: FilterValuesType
  tasks: Array<TaskType>
  removeTask: (taskId: string, todolistId: string) => void
  changeFilter: (value: FilterValuesType, todoList: string) => void
  addTask: (title: string, todolistId: string) => void
  changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  changeTitle: (taskId: string, newTitle: string, todolistId: string) => void
  removeTodoList: (todoListId: string) => void
  changeTodolistTitle: (todoListId: string, newTitle: string) => void
}


export function Todolist(props: PropsType) {

  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
  const removeTodoList = () => {props.removeTodoList(props.id)}
  const changeTodolistTitle = (newTitle: string) => {props.changeTodolistTitle(props.id, newTitle)}
  const addTask = (title: string) => {props.addTask(title, props.id)}

  return <div>
    <h3> <EdiableSpan title={props.title} onChange={changeTodolistTitle} />
      <button onClick={removeTodoList}>x</button>
    </h3>
    <AddItemForm addItem={addTask} />
    <ul>
      {
        props.tasks.map(t => {
          const onClickHandler = () => props.removeTask(t.id, props.id)
          const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, props.id)
          }
          const changeTitleHandler = (newValue: string) => {
            props.changeTitle(t.id, newValue, props.id)
          }

          return <li key={t.id} className={t.isDone ? "is-done" : ""}>
            <input
              onChange={changeStatusHandler}
              type="checkbox"
              checked={t.isDone}
            />
            <EdiableSpan
              title={t.title}
              onChange={changeTitleHandler}
              />
            <button onClick={onClickHandler}>x</button>
          </li>
        })
      }
    </ul>
    <div>
      <button
        className={props.filter === "all" ? "active-filter" : ""}
        onClick={onAllClickHandler}>All
      </button>
      <button
        className={props.filter === "active" ? "active-filter" : ""}
        onClick={onActiveClickHandler}>Active
      </button>
      <button
        className={props.filter === "completed" ? "active-filter" : ""}
        onClick={onCompletedClickHandler}>Completed
      </button>
    </div>
  </div>
}

