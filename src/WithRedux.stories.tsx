import React from "react";
import AppWithRedux from "./WithRedux";
import {Provider} from "react-redux";
import {store} from "./store/store";
import {ReduxStoreProviderDecorator} from "./stories/decorators/ReduxStoreProviderDecorato";

export default {
  title: "AppWithRedux Component",
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator]
}

export const AppWithReduxExample = () => {
  return <AppWithRedux/>
}