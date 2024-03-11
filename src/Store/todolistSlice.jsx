import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const initialState = [{ id: 1, item: "todo test", updatedCount: 0 }]
export const todolistSlice = createSlice({
    name: "todolist",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            let newItem = action.payload;
            let uniqueId = uuidv4();
            let updatedCount = 0;
            let newTodo = { id: uniqueId, item: newItem, updatedCount };
            return [...state, newTodo]
        },

        deleteTodo: (state, action) => {
            const deleteTodoId = action.payload;
            const filteredTodoList = state.filter((eachTodo) => eachTodo.id !== deleteTodoId)
            return filteredTodoList
        },

        editTodo: (state, action) => {
            const { id, updatedTodoText } = action.payload;

            const updatedTodoList = state.map(eachTodo =>
                id !== eachTodo.id
                    ? eachTodo
                    : { ...eachTodo, item: updatedTodoText, updatedCount: eachTodo.updatedCount + 1 }
            );

            return updatedTodoList;
        }
    }
})

export const { addTodo, deleteTodo, editTodo } = todolistSlice.actions
export default todolistSlice.reducer 
