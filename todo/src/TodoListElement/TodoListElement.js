import { Button, Card } from "antd";
import React, { useState } from "react";
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

  let [isShowStatus, setIsShowStatus] = useState(false);

  const deleteTodo = () => {
    onDeleteTodo(id);
  };

  const onToggleWork = () => {
    onChangeWorkStatus(id);
  };

  const onToggleDone = () => {
    onChangeWorkStatusDone(id);
  };

  const saveChanges = () => {
    onSaveChanges();
    setIsShowStatus(!isShowStatus);
  };

  const onEdit = () => {
    setIsShowStatus(!isShowStatus);
  };

  return (
    <Card className="card-todo" title={title} bordered={true}>
      <div className="card-description">{description}</div>
      <div>deadline: {deadline}</div>

      {isShowStatus ? (
        <>
          {workStatus || isDone ? null : (
            <div>
              <input type="checkbox" onClick={onToggleWork} />
              take into development
            </div>
          )}

          {workStatus && !isDone ? (
            <div>
              <input type="checkbox" onClick={onToggleDone} />
              change status to 'done'
            </div>
          ) : null}

          {isDone ? (
            <div>
              <input type="checkbox" onClick={onToggleDone} />
              return into development
            </div>
          ) : null}

          <div className='buttonOnchange' >
            <Button onClick={deleteTodo} className="btn-delete">
              Delete task
            </Button>
            <Button onClick={saveChanges} className="btn-save">
              Save
            </Button>
          </div>
        </>
      ) : (
        <Button onClick={onEdit} className="btn-edit">
          Options
        </Button>
      )}
    </Card>
  );
};
