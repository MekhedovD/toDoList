import {action} from "@storybook/addon-actions";
import React from "react";
import { EditableSpan } from "./EditableSpan";

export default {
  title: "EditableSpan Component",
  component: EditableSpan
}
const changeCallback = action("Value changed");

export const EditableSpanExample = () => {
  return <EditableSpan title={"Start value"} onChange={changeCallback} />
}