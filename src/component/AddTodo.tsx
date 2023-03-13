import React from 'react';

export function AddTodo(props: {
  inputTodo: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}) {
  return (
    <section>
      <input
        type="text"
        className="todo-input"
        placeholder="Enter your todo item"
        value={props.inputTodo}
        onChange={props.onChange}
      />
      <button onClick={props.onClick} className="add-btn">
        +
      </button>
    </section>
  );
}
