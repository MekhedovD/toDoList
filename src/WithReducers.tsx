import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from "@material-ui/icons";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function AppWithReducers() {
  let todoListId1 = v1()
  let todoListId2 = v1()

  let [todolists, dispatchToTodolistReducer] = useReducer(todolistsReducer,[
    {id: todoListId1, title: "What to buy", filter: "all"},
    {id: todoListId2, title: "What to learn", filter: "all"},
  ])

  let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer,{
    [todoListId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todoListId2]: [
      {id: v1(), title: "book", isDone: false},
      {id: v1(), title: "milk", isDone: true},
    ]
  })

  // functions for todoList
  function changeFilter(value: FilterValuesType, todolistId: string) {
    const action = changeTodolistFilterAC(value, todolistId);
    dispatchToTodolistReducer(action);
  }
  function addTodolist(title: string) {
    const action = addTodolistAC(title);
    dispatchToTasksReducer(action);
    dispatchToTodolistReducer(action);
  }
  function removeTodoList (id: string) {
    const action = removeTodolistAC(id);
    dispatchToTasksReducer(action);
    dispatchToTodolistReducer(action);
  }
  function changeTodolistTitle(id: string, newTitle: string) {
    const action = changeTodolistTitleAC(id, newTitle);
    dispatchToTodolistReducer(action);
  }

  // functions for tasks
  function removeTask(id: string, todolistId: string) {
    const action = removeTaskAC(id,todolistId);
    dispatchToTasksReducer(action);
  }
  function addTask(title: string, todolistId: string) {
    const action = addTaskAC(title, todolistId);
    dispatchToTasksReducer(action);
  }
  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    const action = changeTaskStatusAC(id, isDone, todolistId);
    dispatchToTasksReducer(action);
  }
  function changeTitle(id: string, newTitle: string, todolistId: string) {
    dispatchToTasksReducer(changeTaskTitleAC(id, newTitle, todolistId));
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: "10px"}}>
          <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={10}>
          {
            todolists.map((tl) => {
              let tasksForTodolist = tasksObj[tl.id];

              if (tl.filter === "active") {
                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
              }
              if (tl.filter === "completed") {
                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
              }
              return <Grid item>
                <Paper style={{padding: "10px"}}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    changeTitle={changeTitle}
                    filter={tl.filter}
                    removeTodoList={removeTodoList}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            })
          }
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithReducers;
