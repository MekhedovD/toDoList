import {action} from "@storybook/addon-actions";
import React from "react";
import {Task} from "./Task";

export default {
  title: "Task Component",
  component: Task
}
const changeStatusCallback = action("Status changed");
const changeTitleCallback = action("Title changed")
const removeTaskCallback = action("Task removed")

export const TaskBaseExample = () => {
  return <>
    <Task
      todolistId={"todolistId1"}
      changeStatus={changeStatusCallback}
      changeTitle={changeTitleCallback}
      removeTask={removeTaskCallback}
      task={{id: "1", isDone: true, title: "CSS"}}
    />
    <Task
      todolistId={"todolistId2"}
      changeStatus={changeStatusCallback}
      changeTitle={changeTitleCallback}
      removeTask={removeTaskCallback}
      task={{id: "2", isDone: false, title: "JS"}}
    />
  </>
}