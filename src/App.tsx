import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from "@material-ui/icons";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {
  let todoListId1 = v1()
  let todoListId2 = v1()

  let [todolists, setTodoList] = useState<Array<TodolistType>>([
    {id: todoListId1, title: "What to buy", filter: "all"},
    {id: todoListId2, title: "What to learn", filter: "all"},
  ])

  let [tasksObj, setTasks] = useState<TasksStateType>({
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
  function changeFilter(value: FilterValuesType, todoLIstId: string) {
    let todolist = todolists.find(tl => tl.id === todoLIstId);
    if (todolist) {
      todolist.filter = value
      setTodoList([...todolists])
    }
  }
  function addTodolist(title: string) {
    let newTodolistId = v1();
    let newTodolist: TodolistType = {
      id: newTodolistId,
      title: title,
      filter: "all"
    };
    setTodoList([newTodolist, ...todolists]);
    setTasks({
      ...tasksObj,
      [newTodolistId]: []
    })
  }
  function removeTodoList (id: string) {
    // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
    setTodoList(todolists.filter(tl => tl.id !== id));
    // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
    delete tasksObj[id] // удаляем св-во из объекта... значением которого являлся массив тасок
    // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    setTasks({...tasksObj});
  }
  function changeTodolistTitle(id: string, newTitle: string) {
    // найдём нужный todolist
    const todolist = todolists.find(tl => tl.id === id);
    if (todolist) {
      // если нашёлся - изменим ему заголовок
      todolist.title = newTitle;
      setTodoList([...todolists])
    }
  }

  // functions for tasks
  function removeTask(id: string, todolistId: string) {
    //достанем нужный массив по todolistId:
    let tasks = tasksObj[todolistId];
    // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
    tasksObj[todolistId] = tasks.filter(t => t.id !== id);
    // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    setTasks({...tasksObj});
  }
  function addTask(title: string, todolistId: string) {
    let task = {id: v1(), title: title, isDone: false};
    //достанем нужный массив по todolistId:
    let tasks = tasksObj[todolistId];
    // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
    tasksObj[todolistId] = [task, ...tasks];
    // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    setTasks({...tasksObj});
  }
  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    //достанем нужный массив по todolistId:
    let tasks = tasksObj[todolistId];
    // найдём нужную таску:
    let task = tasks.find(t => t.id === id);
    //изменим таску, если она нашлась
    if (task) {
      task.isDone = isDone;
      //засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
      setTasks({...tasksObj});
    }
  }
  function changeTitle(id: string, newTitle: string, todolistId: string) {
    //достанем нужный массив по todolistId:
    let tasks = tasksObj[todolistId];
    // найдём нужную таску:
    let task = tasks.find(t => t.id === id);
    //изменим таску, если она нашлась
    if (task) {
      task.title = newTitle
      // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
      setTasks({...tasksObj})
    }
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

export default App;
