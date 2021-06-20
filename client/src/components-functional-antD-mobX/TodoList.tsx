import { List } from "antd";
import { FC } from "react";
import { TodoInterface } from "../App";
import { Todo } from "./Todo";

interface Props {
  todos: TodoInterface[];
}

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <div>
      <List
        style={{ display: "block" }}
        dataSource={[...todos]}
        renderItem={(todo) => (<Todo todo={todo} />)}
      />
    </div>
  );
};
