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
  useEffect(() => {
    todolistAPI.createTodolist("DimycH")
      .then((res) => {
        setState(res.data)
      })
  }, [])

  return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = "a695376b-3b33-4919-88f7-b2a1135fe43e";
    todolistAPI.deleteTodolist(todolistId)
      .then((res) => {
        setState(res.data)
      })
  }, [])

  return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = "02dea32f-acc2-4271-8ebc-041051ca48f1";
    todolistAPI.updateTodolist(todolistId, "DIMYCH")
      .then((res) => {
        setState(res.data)
      })
  }, [])

  return <div> {JSON.stringify(state)}</div>
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



