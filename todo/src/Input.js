import { Input } from "antd";
import React from "react";

export const MyInput = ({value, onInputChange}) => {
  return (
    <Input
      className="TodoFilter"
      placeholder="find todo"
      value={value}
      onChange={onInputChange}
    />
  );
};
