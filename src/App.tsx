import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";
type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {

  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let filteredTasks = tasks.filter(t => t.id !== id);
    tasksObj[todolistId] = filteredTasks
    setTasks({...tasksObj});
  }

  function addTask(title: string, todolistId: string) {
    let task = {id: v1(), title: title, isDone: false};
    let tasks = tasksObj[todolistId];
    let newTasks = [task, ...tasks];
    tasksObj[todolistId] = newTasks
    setTasks({...tasksObj});
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId]
    const task = tasks.find(t => t.id === taskId)
    if (task) {
      task.isDone = isDone
      setTasks({...tasksObj})
    }
  }

  function changeTitle(taskId: string, newTitle: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    const task = tasks.find(t => t.id === taskId)
    if (task) {
      task.title = newTitle
      setTasks({...tasksObj})
    }
  }

  function changeFilter(value: FilterValuesType, todoLIstId: string) {
    let todolist = todolists.find(tl => tl.id === todoLIstId);
    if (todolist) {
      todolist.filter = value
      setTodoList([...todolists])
    }
  }

  let todoListId1 = v1()
  let todoListId2 = v1()

  let [todolists, setTodoList] = useState<Array<TodoListType>>([
    {id: todoListId1, title: "What to buy", filter: "all"},
    {id: todoListId2, title: "What to learn", filter: "all"},
  ])

  let removeTodoList = (todolistId: string) => {
    let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
    setTodoList(filteredTodolist)
  }

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

  function changeTodolistTitle(id: string, newTitle: string) {
   const todolist = todolists.find(tl => tl.id === id);
   if (todolist) {
     todolist.title = newTitle;
     setTodoList([...todolists])
   }
  }

  function addTodolist(title: string) {
    let newTodolistId = v1();
    let newTodolist: TodoListType = {
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

  return (
    <div className="App">
      <AddItemForm addItem={addTodolist}/>
      {
        todolists.map((tl) => {
          let tasksForTodolist = tasksObj[tl.id];

          if (tl.filter === "active") {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
          }
          if (tl.filter === "completed") {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
          }
          return <Todolist
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
        })
      }

    </div>
  );
}

export default App;
