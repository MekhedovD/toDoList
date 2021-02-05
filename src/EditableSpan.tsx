import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
  title: string
  onChange: (newValue: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState(props.title)

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
}
const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title)
}
const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

return editMode
  ? <TextField onChange={onChangeTitleHandler} value={title} onBlur={activateViewMode} autoFocus/>
  : <span onDoubleClick={activateEditMode}>{props.title}</span>
}