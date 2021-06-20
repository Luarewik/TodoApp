import { Checkbox, List } from "antd";
import { FC } from "react";
import { TodoInterface } from "../App";

interface Props {
  todo: TodoInterface;
}

export const Todo: FC<Props> = ({ todo }) => {
  return (
    <List.Item>
      <Checkbox
        key={todo.id}
        checked={todo.complete}
        onChange={() => todo.complete = !todo.complete}
      >
        {todo.name}
      </Checkbox>
    </List.Item>
  );
};
