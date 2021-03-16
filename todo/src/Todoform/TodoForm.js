import React, { useState } from "react";
import { DatePicker, Button } from "antd";
import "./TodoForm.css";

export const TodoForm = ({ onSaveTodo, onAddTodo }) => {
  const initialFormState = {
    title: "",
    description: "",
    deadline: null,
    workStatus: false,
    isDone: false,
  };
  const [inputChange, setInputChange] = useState(initialFormState);

  function onChangeDate(date, dateString) {
    setInputChange({ ...inputChange, deadline: dateString });
  }

  const onInputChange = ({ target }) => {
    setInputChange({
      ...inputChange,
      [target.name]: target.value,
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    onSaveTodo(inputChange);
    setInputChange(initialFormState);
    onAddTodo();
  };

  return (
    <form className="TodoForm">
      <h1 className="form-greet">What we have to do?</h1>
      <input
        className="TodoFormInput"
        placeholder="Task title"
        name="title"
        value={inputChange.title}
        onChange={onInputChange}
      />
      <textarea
        className="TodoFormTextarea"
        placeholder="Task description"
        name="description"
        value={inputChange.description}
        onChange={onInputChange}
      />
      <DatePicker
        className="DataPicker"
        placeholder="deadline"
        onChange={onChangeDate}
      />
      <div className="buttons">
        <Button onClick={onFormSubmit} className="btn-add" type="primary">
          Save
        </Button>
        <Button onClick={onAddTodo} className="btn-quit" type="primary">
          Quit
        </Button>
      </div>
    </form>
  );
};
