import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from "@material-ui/icons";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store/store";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function AppWithRedux() {
  console.log("App called")
  const dispatch = useDispatch()
  const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)
  const tasksObj = useSelector<AppRootState, TasksStateType>(state => state.tasks)

  // functions for todoList
  const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
    const action = changeTodolistFilterAC(value, todolistId);
    dispatch(action);
  }, [dispatch]);

  const addTodolist = useCallback((title: string) => {
    const action = addTodolistAC(title);
    dispatch(action);
  }, [dispatch]);

  const removeTodoList = useCallback((id: string) => {
    const action = removeTodolistAC(id);
    dispatch(action);
  }, [dispatch]);

  const changeTodolistTitle = useCallback((id: string, newTitle: string) => {
    const action = changeTodolistTitleAC(id, newTitle);
    dispatch(action);
  }, [dispatch]);

  // functions for tasks
  const removeTask = useCallback((id: string, todolistId: string) => {
    const action = removeTaskAC(id,todolistId);
    dispatch(action);
  }, [dispatch]);

  const addTask = useCallback((title: string, todolistId: string) => {
    const action = addTaskAC(title, todolistId);
    dispatch(action);
  }, [dispatch]);

  const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
    const action = changeTaskStatusAC(id, isDone, todolistId);
    dispatch(action);
  }, [dispatch]);

  const changeTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
    dispatch(changeTaskTitleAC(id, newTitle, todolistId));
  }, [dispatch]);

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

export default AppWithRedux;
