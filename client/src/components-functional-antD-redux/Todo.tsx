import { Checkbox, List } from "antd";
import React, { FC } from "react";
import { TodoInterface } from "../App";
import { useAppDispatch } from "./hooks";
import { toggleTask } from "./todoSlice";

interface Props {
  todo: TodoInterface;
}

export const Todo: FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();

  function handleToggle() {
    dispatch(toggleTask(todo.id));
  }

  return (
    <List.Item>
      <Checkbox
        key={todo.id}
        checked={todo.complete}
        onChange={handleToggle}
      >
        {todo.name}
      </Checkbox>
    </List.Item>
  );
};

