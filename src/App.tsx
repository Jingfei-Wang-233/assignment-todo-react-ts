import React, { useEffect, useState } from 'react';
import { fetch } from './api/tasks';
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

  return (
    <div className="App">
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input type="checkbox" id={task.id as unknown as string} />
            <label htmlFor={task.id as unknown as string}>{task.name}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
