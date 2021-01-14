import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
  addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

  let [title, setTitle] = useState<string>("")
  let [error, setError] = useState<string | null>(null)

  let errorDiv = error ? <div className={"error-message"}>{error}</div> : null

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
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
    <input value={title}
           onChange={onChangeHandler}
           onKeyPress={onKeyPressHandler}
           className={error ? "error" : ""}
    />
    <button onClick={addTask}>+</button>
    {errorDiv}
  </div>
}