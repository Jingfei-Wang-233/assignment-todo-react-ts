import React, { useEffect, useState } from 'react';
import { fetch, update } from './api/tasks';
import { Task } from './types';

const App = () => {
  // useState 更新 tasks的state
  // useState 的初始值是数组、对象等复杂的数据类型，需要明确指定泛型类型, 否则： TS2339: Property 'name' does not exist on type 'never'.
  const [tasks, setTasks] = useState<Task[]>([]);

  // useEffect 获取数据，以便能setTask
  useEffect(() => {
    fetch().then((data) => setTasks(data));
    // console.log(tasks);
  }, []);

  function handleChange(task: Task) {
    //console.log(task);
    const updatedTask = {
      ...task,
      completed: !task.completed,
    };
    update(Number(task.id), updatedTask).then((data) => console.log(data));
    fetch().then((data) => setTasks(data));
    // setTasks((tasks) => {
    //   tasks[Number(task.id)] = data;
    //   return tasks;
    // };
    // setTasks((tasks) => {
    //   tasks[Number(task.id)] = updatedTask;
    //   return tasks;
    // });
  }

  return (
    <div className="App">
      <h3>Todo List</h3>
      <ul>
        {tasks.map(
          (task) =>
            !task.completed && (
              <li key={task.id}>
                <input
                  type="checkbox"
                  id={task.id as unknown as string}
                  checked={task.completed}
                  onChange={() => handleChange(task)}
                />
                <label>{task.name}</label>
              </li>
            ),
        )}
      </ul>
      <h3>Completed List</h3>
      <ul>
        {tasks.map(
          (task) =>
            task.completed && (
              <li key={task.id}>
                <input
                  type="checkbox"
                  id={task.id as unknown as string}
                  checked={task.completed}
                  onChange={() => handleChange(task)}
                />
                <label>{task.name}</label>
              </li>
            ),
        )}
      </ul>
    </div>
  );
};

export default App;
