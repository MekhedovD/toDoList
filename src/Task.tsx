import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

type TaskPropsType = {
  removeTask: (taskId: string, todolistId: string) => void
  changeTitle: (taskId: string, newTitle: string, todolistId: string) => void
  changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  task: TaskType
  todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
  const onClickHandler = () => props.removeTask(props.task.id, props.todolistId)
  const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeStatus(props.task.id, e.currentTarget.checked, props.todolistId)
  }
  const changeTitleHandler = useCallback((newValue: string) => {
    props.changeTitle(props.task.id, newValue, props.todolistId)
  }, [props.changeTitle, props.task.id, props.todolistId])

  return (
    <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
      <Checkbox
        onChange={changeStatusHandler}
        checked={props.task.isDone}
      />
      <EditableSpan
        title={props.task.title}
        onChange={changeTitleHandler}
      />
      <IconButton onClick={onClickHandler}>
        <Delete/>
      </IconButton>
    </div>
  )
} )