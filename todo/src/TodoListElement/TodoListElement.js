import { Button, Card, Checkbox } from "antd";
import React from "react";
import "./TodoListElement.css";

export const TodoListElement = (props) => {
  const {
    todo,
    onDeleteTodo,
    onChangeWorkStatus,
    onChangeWorkStatusDone,
    onSaveChanges,
  } = props;
  const { title, description, deadline, id, workStatus, isDone } = todo;

  const deleteTodo = () => {
    onDeleteTodo(id);
  };

  const onToggleWork = () => {
    onChangeWorkStatus(id);
  };

  const onToggleDone = () => {
    onChangeWorkStatusDone(id);
  };

  const saveChages = () => {
    onSaveChanges();
  };

  return (
    <Card className="card-todo" title={title} bordered={true}>
      <div className="card-description">{description}</div>
      <div>deadline: {deadline}</div>
      {workStatus ? null : (
        <div>
          <input type="checkbox" onClick={onToggleWork} />
          {workStatus ? "return to all todo" : "take into development"}
        </div>
      )}

      <div>
        <input type="checkbox" onClick={onToggleDone} />
        {isDone ? "return into development" : "done"}
      </div>

      <Button onClick={deleteTodo} className="btn-delete">
        Delete task
      </Button>
      <Button onClick={saveChages} className="btn-in-work">
        Save
      </Button>
    </Card>
  );
};
