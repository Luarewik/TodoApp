import React, { FC } from "react";
import { TodoInterface } from "../App";
import { Todo } from "./Todo";

interface Props {
  todos: TodoInterface[];
  toggleTodo: (id: string) => void;
}

export const TodoList: FC<Props> = ({ todos, toggleTodo }) => {
  return (
    <div>
      {todos.map((todo) => {
        return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} />;
      })}
    </div>
  );
};
