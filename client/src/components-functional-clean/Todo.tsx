import React, { FC } from "react";
import { TodoInterface } from "../App";

interface Props {
  todo: TodoInterface;
  toggleTodo: (id: string) => void;
}

export const Todo: FC<Props> = ({ todo, toggleTodo }) => {
  function handleTodoClick() {
    toggleTodo(todo.id);
  }

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={handleTodoClick}
        />
        {todo.name}
      </label>
    </div>
  );
};
