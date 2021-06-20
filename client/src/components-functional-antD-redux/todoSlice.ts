import { TodoInterface } from "../App";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface TodoState {
  todos: TodoInterface[];
}

interface TodoAction {
  id?: string;
  type: string;
  payload: TodoInterface;
}

const initialState = {
  todos: [],
} as TodoState;

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    add: (state: TodoState, action: TodoAction) => {
      state.todos.push(action.payload);
    },

    clearComplete: (state: TodoState) => {
      console.log(state.todos);

      state.todos = state.todos.filter((todo) => !todo.complete);
    },

    toggleTask: (state: TodoState, action: PayloadAction<string>) => {
      let todo = state.todos.find((todo) => todo.id === action.payload);
      todo!.complete = !todo?.complete;
    },

    loadFromLc: (state: TodoState) => {
      const storedTodos = localStorage.getItem("todos");
      if (storedTodos) {
        state.todos = JSON.parse(storedTodos);
      }
    },
  },
});

export const { add, clearComplete, toggleTask, loadFromLc } = todoSlice.actions;

export const selectTodos = (state: RootState) => state.todo;

export default todoSlice.reducer;
