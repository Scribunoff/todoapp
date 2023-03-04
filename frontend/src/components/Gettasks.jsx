import { useState, useEffect } from 'react';
import axios from 'axios';

/* ascync get request to the server */
function Gettasks() {
  const [tasks, setItems] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      const response = await axios.get('http://localhost:8080/api/v1');
      setItems(response.data);
    };

    loadTasks();
  }, []);

  return tasks;
}

export default Gettasks;
