import {root} from "./RootReducer";
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({reducer: root})