import React, { useState, useEffect } from 'react';

import { Tasks } from './components/tasks';
import { Route, Routes } from 'react-router-dom';
import { Completed } from './components/completed';
import { Important } from './components/important';
import Mainpage from './components/global/Mainpage';
import axios from 'axios';
import Gettasks from './components/Gettasks';

function App() {
  /* GET request to the server */
  const firstTasks = Gettasks();

  /* Update info from the server */
  const [tasks, setTasks] = useState(firstTasks);
  useEffect(() => {
    const loadTasks = async () => {
      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      await sleep(1000);
      const response = await axios.get('http://localhost:8080/api/v1');
      setTasks(response.data);
    };

    loadTasks();
  }, [tasks]);

  /* React routes */
  return (
    <Routes>
      <Route path="/" element={<Mainpage />}>
        <Route path="" element={<Tasks items={tasks} />} />
        <Route path="important" element={<Important items={tasks} />} />
        <Route path="completed" element={<Completed items={tasks} />} />
      </Route>
    </Routes>
  );
}

export default App;
