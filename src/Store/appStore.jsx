import { configureStore } from "@reduxjs/toolkit";
import todolistSlice from "./todolistSlice";

export const appStore = configureStore({
    reducer: {
        todolist: todolistSlice,

    },
})


export default appStore
