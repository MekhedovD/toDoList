import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox, ControlPoint} from "@material-ui/icons";

type AddItemFormPropsType = {
  addItem: (title: string) => void
}

export const AddItemForm = React.memo( (props: AddItemFormPropsType) => {
  console.log("AddItemForm called")
  let [title, setTitle] = useState<string>("")
  let [error, setError] = useState<string | null>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if(error !== null) {
      setError(null);
    }
    if (e.charCode === 13) {
      addTask();
    }
  }

  const addTask = () => {
    const taskTitle = title.trim()
    if (taskTitle) {
      props.addItem(taskTitle);
      setTitle("");
    } else {
      setError("Title is required")
    }
  }

  return <div>
    <TextField value={title}
               variant={"outlined"}
               label={"Title"}
               // label={title}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
               error={!!error}
               helperText={error}
    />
    <IconButton onClick={addTask} color={"primary"}>
      {/*<ControlPoint />*/}
      <AddBox />
    </IconButton>
  </div>
} )