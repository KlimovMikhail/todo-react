import React from "react";
import { TodoListElement } from "../TodoListElement/TodoListElement";

export const TodoList = (props) => {
  const {
    todos,
    onDeleteTodo,
    onChangeWorkStatus,
    onSaveChanges,
    onChangeWorkStatusDone,
  } = props;

  return todos.map((elem) => {
    return (
      <TodoListElement
        key={elem.id}
        todo={elem}
        onDeleteTodo={onDeleteTodo}
        onChangeWorkStatus={onChangeWorkStatus}
        onChangeWorkStatusDone={onChangeWorkStatusDone}
        onSaveChanges={onSaveChanges}
      />
    );
  });
};
