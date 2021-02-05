import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
    <h3> <EditableSpan title={props.title} onChange={changeTodolistTitle} />
      <IconButton onClick={removeTodoList}>
        <Delete />
      </IconButton>
    </h3>
    <AddItemForm addItem={addTask} />
    <div>
      {
        props.tasks.map(t => {
          const onClickHandler = () => props.removeTask(t.id, props.id)
          const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, props.id)
          }
          const changeTitleHandler = (newValue: string) => {
            props.changeTitle(t.id, newValue, props.id)
          }

          return <div key={t.id} className={t.isDone ? "is-done" : ""}>
            <Checkbox
              onChange={changeStatusHandler}
              checked={t.isDone}
            />
            <EditableSpan
              title={t.title}
              onChange={changeTitleHandler}
              />
            <IconButton onClick={onClickHandler}>
              <Delete />
            </IconButton>
          </div>
        })
      }
    </div>
    <div>
      <Button
        variant={props.filter === "all" ? "contained" : "text"}
        onClick={onAllClickHandler}>All
      </Button>
      <Button
        color={"primary"}
        variant={props.filter === "active" ? "contained" : "text"}
        onClick={onActiveClickHandler}>Active
      </Button>
      <Button
        color={"secondary"}
        variant={props.filter === "completed" ? "contained" : "text"}
        onClick={onCompletedClickHandler}>Completed
      </Button>
    </div>
  </div>
}

