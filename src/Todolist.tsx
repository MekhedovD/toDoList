import React, {useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

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
  changeFilter: (value: FilterValuesType, todoList: string) => void
  removeTodoList: (todoListId: string) => void
  changeTodolistTitle: (todoListId: string, newTitle: string) => void
  addTask: (title: string, todolistId: string) => void

  removeTask: (taskId: string, todolistId: string) => void
  changeTitle: (taskId: string, newTitle: string, todolistId: string) => void
  changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
}


export const Todolist = React.memo( (props: PropsType) => {
  console.log("Todolist called")
  const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);

  const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);

  const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);

  const removeTodoList = () => {props.removeTodoList(props.id)}

  const changeTodolistTitle = useCallback((newTitle: string) => {props.changeTodolistTitle(props.id, newTitle)}, [props.id, props.changeTodolistTitle])

  const addTask = useCallback( (title: string) => {props.addTask(title, props.id)}, [props.addTask, props.id] )

  let tasksForTodolist = props.tasks;

  if (props.filter === "active") {
    tasksForTodolist = props.tasks.filter(t => t.isDone === false);
  }
  if (props.filter === "completed") {
    tasksForTodolist = props.tasks.filter(t => t.isDone === true);
  }

  return <div>
    <h3> <EditableSpan title={props.title} onChange={changeTodolistTitle} />
      <IconButton onClick={removeTodoList}>
        <Delete />
      </IconButton>
    </h3>
    <AddItemForm addItem={addTask} />
    <div>
      {
        props.tasks.map(t => <Task
          todolistId={props.id}
          changeStatus={props.changeStatus}
          changeTitle={props.changeTitle}
          removeTask={props.removeTask}
          task={t}
          key={t.id}
        />)
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
} )

