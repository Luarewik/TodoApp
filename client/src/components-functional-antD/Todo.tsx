import { Checkbox, List } from "antd";
import React, { FC } from "react";
import { TodoInterface } from "../App";

interface Props {
  todo: TodoInterface;
  toggleTodo: (id: string) => void;
}

export const Todo: FC<Props> = ({ todo, toggleTodo }) => {
  return (
    <List.Item>
      <Checkbox
        key={todo.id}
        checked={todo.complete}
        onChange={() => toggleTodo(todo.id)}
      >
        {todo.name}
      </Checkbox>
    </List.Item>
  );
};
