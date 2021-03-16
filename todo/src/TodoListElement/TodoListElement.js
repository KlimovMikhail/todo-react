import { Button, Card, DatePicker } from "antd";
import React, { useState } from "react";
import "./TodoListElement.css";

export const TodoListElement = (props) => {
  const [inputChange, setInputChange] = useState({
    isEditing: false,
    title: "",
    description: "",
    deadline: null,
  });

  let [isShowStatus, setIsShowStatus] = useState(false);

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

  const saveChanges = () => {
    onSaveChanges(inputChange, id);
    setInputChange({
      ...inputChange,
      isEditing: false,
    });
    setIsShowStatus(!isShowStatus);
  };

  const onEdit = () => {
    setInputChange({
      isEditing: true,
      title: title,
      description: description,
      deadline: deadline,
    });
    setIsShowStatus(!isShowStatus);
  };

  const onInputChange = ({ target }) => {
    setInputChange({
      ...inputChange,
      [target.name]: target.value,
    });
  };

  function onChangeDate(date, dateString) {
    setInputChange({ ...inputChange, deadline: dateString });
  }

  const InputTitle = (
    <input onChange={onInputChange} name="title" defaultValue={title} />
  );

  const InputDescription = (
    <textarea
      name="description"
      defaultValue={description}
      onChange={onInputChange}
    />
  );

  const InputDate = (
    <DatePicker className="DataPicker" onChange={onChangeDate} />
  );

  return (
    <Card
      className="card-todo"
      title={inputChange.isEditing ? InputTitle : title}
      bordered={true}
    >
      {inputChange.isEditing ? (
        InputDescription
      ) : (
        <div className="card-description">{description}</div>
      )}

      {inputChange.isEditing ? InputDate : <div>deadline: {deadline}</div>}

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

          <div>
            <Button onClick={saveChanges} className="btn-save">
              Save
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="buttonOnchange">
            <Button onClick={onEdit} className="btn-edit">
              Edit
            </Button>
            <Button onClick={deleteTodo} className="btn-delete">
              Delete task
            </Button>
          </div>
        </>
      )}
    </Card>
  );
};