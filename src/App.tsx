import React, { useEffect, useState } from 'react';
import { add, fetch, remove, update } from './api/tasks';
import { Task } from './types';
import { AddTodo } from './component/AddTodo';

const App = () => {
  // useState 更新 tasks的state
  // useState 的初始值是数组、对象等复杂的数据类型，需要明确指定泛型类型, 否则： TS2339: Property 'name' does not exist on type 'never'.
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  // useEffect 获取数据，以便能setTask
  // 通过useEffect实现列表数据的获取与更新
  useEffect(() => {
    fetch().then((data) => setTasks(data));
  }, []);

  // 更新 tasks
  async function handleChange(task: Task) {
    const updatedTask = {
      ...task,
      completed: !task.completed,
    };
    await update(Number(task.id), updatedTask).then((data) => console.log(data));
    await fetch().then((data) => setTasks(data));
  }
  // 新增task
  const handleAdd = async () => {
    newTodo.trim().length > 0 &&
      (await add(newTodo.trim()).then((data) => setTasks([...tasks, data])));
    setNewTodo('');
  };
  // 删除task
  const handleDelete = async (id: number | undefined) => {
    await remove(Number(id)).then(() => console.log(id));
    setTasks(tasks.filter((task) => task.id !== id));
  };
  return (
    <div className="App">
      <h3>Todo List</h3>
      <AddTodo
        inputTodo={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onClick={handleAdd}
      />
      <ul>
        {tasks
          .map(
            (task) =>
              !task.completed && (
                <li key={task.id}>
                  <div>
                    <input
                      type="checkbox"
                      id={task.id as unknown as string}
                      checked={task.completed}
                      onChange={() => handleChange(task)}
                    />
                    <label> {task.name} </label>
                    <button className="bi-trash" onClick={() => handleDelete(task.id)}>
                      del
                    </button>
                  </div>
                </li>
              ),
          )
          .reverse()}
      </ul>
      <h3>Completed List</h3>
      <ul>
        {tasks.map(
          (task) =>
            task.completed && (
              <li key={task.id}>
                <div>
                  <input
                    type="checkbox"
                    id={task.id as unknown as string}
                    checked={task.completed}
                    onChange={() => handleChange(task)}
                  />
                  <label> {task.name} </label>
                  <button className="bi-trash" onClick={() => handleDelete(task.id)}>
                    del
                  </button>
                </div>
              </li>
            ),
        )}
      </ul>
    </div>
  );
};

export default App;
