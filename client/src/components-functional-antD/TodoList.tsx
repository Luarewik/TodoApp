import { List } from "antd";
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
      <List
        style={{ display: "block" }}
        dataSource={todos}
        renderItem={(todo) => (<Todo todo={todo} toggleTodo={toggleTodo} />)}
      />
    </div>
  );
};
