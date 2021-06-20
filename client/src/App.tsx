import React from 'react';
import './App.css';
import { TodoModule } from './components/TodoModule';
import { ObservableTodo } from "./components/todo.observable";

export interface TodoInterface {
  id: string;
  name: string;
  complete: boolean;
}

const todos = new ObservableTodo();

export default function App() {
  return (
    <>
      <TodoModule todos={todos}/>
      {/* <TodoModule /> */}
    </>
  );
}

