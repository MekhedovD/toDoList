import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../../api/todolists-api";

export default {
  title: 'API'
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistAPI.getTodolists()
      .then((res) => {
        setState(res.data)
      })
  }, [])
  return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [title, setTitle] = useState<string>("")

  const createTodo = () => {
      todolistAPI.createTodolist(title)
        .then((res) => {
          setState(res.data)
        })

  }

  return <div> {JSON.stringify(state)}
  <div>
    <input placeholder={"create todo"} value={title} onChange={(e) => {
      setTitle(e.currentTarget.value)
    }}/>
    <button onClick={createTodo}>create Todolist</button>
  </div>
  </div>
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>("")



  const deleteTodo = () => {
    todolistAPI.deleteTodolist(todolistId)
      .then((res) => {
        setState(res.data)
      })
  }

  return <div> {JSON.stringify(state)}
  <div>
    <input placeholder={"todoId"} value={todolistId} onChange={(e) => {
      setTodolistId(e.currentTarget.value)
    }}/>
    <button onClick={deleteTodo}>delete TODOLIST</button>
  </div>
  </div>
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>("")
  const [title, setTitle] = useState<any>(null)



  const updateTodo = () => {

      todolistAPI.updateTodolist(todolistId, title)
        .then((res) => {
          setState(res.data)
        })

  }

  return <div> {JSON.stringify(state)}
  <div>
    <input placeholder={"todolistId"} value={todolistId}  onChange={(e) => {
      setTodolistId(e.currentTarget.value)
    }}/>
    <input placeholder={"title"} value={title}  onChange={(e) => {
      setTitle(e.currentTarget.value)
    }}/>
    <button onClick={updateTodo}>update TODOLIST</button>
  </div>
  </div>
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>("")

  const getTasks = () => {
    todolistAPI.getTasks(todolistId)
      .then((res) => {
        setState(res.data)
      })
  }

  return <div> {JSON.stringify(state)}
    <div>
      <input placeholder={"todolistId"} value={todolistId} onChange={(e) => {
        setTodolistId(e.currentTarget.value)
      }}/>
      <button onClick={getTasks}>get tasks</button>
    </div>
  </div>
}

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  const [taskId, setTaskId] = useState<string>("")
  const [todolistId, setTodolistId] = useState<string>("")

  const deleteTask = () => {
    todolistAPI.deleteTasks(todolistId, taskId)
      .then((res) => {
        setState(res.data)
      })
  }

  return <div> {JSON.stringify(state)}
    <div>
      <input placeholder={"todolistId"} value={todolistId} onChange={(e) => {
        setTodolistId(e.currentTarget.value)
      }}/>
      <input placeholder={"taskId"} value={taskId} onChange={(e) => {
        setTaskId(e.currentTarget.value)
      }}/>
      <button onClick={deleteTask}>delete task</button>
    </div>
  </div>
}

export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  const [taskTitle, setTaskTitle] = useState<string>("")
  const [todolistId, setTodolistId] = useState<string>("")

  const createTask = () => {
    todolistAPI.createTask(todolistId, taskTitle)
      .then((res) => {
        setState(res.data)
      })
  }

  return <div> {JSON.stringify(state)}
    <div>
      <input placeholder={"todolistId"} value={todolistId} onChange={(e) => {
        setTodolistId(e.currentTarget.value)
      }}/>
      <input placeholder={"Task Title"} value={taskTitle} onChange={(e) => {
        setTaskTitle(e.currentTarget.value)
      }}/>
      <button onClick={createTask}>create task</button>
    </div>
  </div>
}

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null)
  const [title, setTitle] = useState<string>("title 1")
  const [description, setDescription] = useState<string>("description 1")
  const [status, setStatus] = useState<number>(0)
  const [priority, setPriority] = useState<number>(0)
  const [startDate, setStartDate] = useState<string>("")
  const [deadline, setDeadline] = useState<string>("")
  const [todolistId, setTodolistId] = useState<string>("")
  const [taskId, setTaskId] = useState<string>("")

  const createTask = () => {
    todolistAPI.updateTask(todolistId, taskId, {
      deadline: "",
      description: description,
      priority: priority,
      startDate: "",
      title: title,
      status: status,
    })
      .then((res) => {
        setState(res.data)
      })
  }

  return <div> {JSON.stringify(state)}
    <div>
      <input placeholder={"todolistId"} value={todolistId} onChange={(e) => {
        setTodolistId(e.currentTarget.value)
      }}/>
      <input placeholder={"taskId"} value={taskId} onChange={(e) => {
        setTaskId(e.currentTarget.value)
      }}/>
      <input placeholder={"Task Title"} value={title} onChange={(e) => {
        setTitle(e.currentTarget.value)
      }}/>
      <input placeholder={"Description"} value={description} onChange={(e) => {
        setDescription(e.currentTarget.value)
      }}/>
      <input placeholder={"status"} value={status} type="number" onChange={(e) => {
        setStatus(+e.currentTarget.value)
      }}/>
      <input placeholder={"priority"} value={priority} type="number" onChange={(e) => {
        setPriority(+e.currentTarget.value)
      }}/>
      <button onClick={createTask}>update task</button>
    </div>
  </div>
}



