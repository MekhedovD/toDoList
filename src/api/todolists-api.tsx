import axios from "axios";

const instance = axios.create({
  baseURL:`https://social-network.samuraijs.com/api/1.1`,
  withCredentials: true,
  headers: {
    "API-KEY": "70d80796-3f72-4c1c-8a51-937b510017ff"
  }
})

export type TodolistType = {
  id: string
  addedDate: string
  order: number
  title: string
}

export type CommonType<T = {}> = {
  resultCode: number
  messages: string[]
  data: T
}

export type TaskType= {
  description: string
  title: string
  completed: boolean
  status: number
  priority: number
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type UpdateTasksType = {
  title: string
  description: string
  status: number
  priority: number
  startDate: string
  deadline: string
}

export type GetTaskResponse = {
  error: string | null
  totalCount: number
  items: TaskType[]
}

export const todolistAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>(`/todo-lists`);
  },

  createTodolist(title: string) {
   return  instance.post<CommonType<{item:TodolistType}>>(`/todo-lists`,{title: title})
  },

  deleteTodolist(id: string) {
    return instance.delete<CommonType>(`/todo-lists/${id}`)
  },

  updateTodolist(id: string, title: string) {
    return instance.put<CommonType>(`/todo-lists/${id}`, {title: title})
  },

  getTasks(todolistId: string) {
    return instance.get<GetTaskResponse>(`/todo-lists/${todolistId}/tasks`);
  },

  createTask(todolistId: string, taskTitle: string) {
    return instance.post<CommonType<TaskType>>(`/todo-lists/${todolistId}/tasks`, {title: taskTitle});
  },

  deleteTasks(todolistId: string, taskId: string) {
    return instance.delete<CommonType>(`/todo-lists/${todolistId}/tasks/${taskId}`);
  },

  updateTask(todolistId: string, taskId: string, model: UpdateTasksType) {
    return instance.put<CommonType>(`/todo-lists/${todolistId}/tasks/${taskId}`, model); //model
  }
}