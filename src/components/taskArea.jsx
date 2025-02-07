import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import axios from 'axios';

function TaskArea() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingTask) {
      handleEditTask({ ...editingTask, title, desc });
    } else {
      handleNewTask({ title, desc });
    }
    setTitle('');
    setDesc('');
  };

  const handleNewTask = async (taskData) => {
    try {
      const response = await axios.post('/api/tasks', taskData);
      setTasks((prevTasks) => [...prevTasks, response.data]); 
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleEditTask = async (updatedTask) => {
    try {
      const response = await axios.put(`/api/tasks?id=${updatedTask._id}`, {
        title: updatedTask.title,
        desc: updatedTask.desc,
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? { ...task, title: updatedTask.title, desc: updatedTask.desc } : task
        )
      );
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await axios.delete(`/api/tasks?id=${taskId}`);
      if (response.status === 200) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId)); 
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditButtonClick = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDesc(task.desc);
  };

  return (
    <div className='p-1 w-full bg-slate-900 rounded border border-slate-700 '>
      <div className="flex  p-3">
        <h1 className='font-bold text-center text-xl'>Add Tasks</h1>

      </div>
      <form onSubmit={handleSubmit} >
        <div className="flex gap-3 m-3">
        <input value={title}
                 onChange={(e) => setTitle(e.target.value)}
                 className='p-2 bg-transparent border border-gray-700 rounded-lg placeholder:top-0' 
                 type="text" id='title' placeholder='Enter title here' required />

        <textarea value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className='p-2 bg-transparent border border-gray-700 rounded-lg w-full' 
                    name="desc" cols='' rows='' id="discription" 
                    placeholder='Task discription here!' required>
        </textarea>
        <button type="submit"
                className='p-5 bg-sky-500 rounded-lg my-5 hover:bg-sky-600 transition duration-200 w-[10rem] h ' >
                {editingTask ? 'Save Changes' : 'Add Task'}
        </button>
        </div>
        </form>

      <div className="task">
        <div className='grid grid-cols-3 justify-between gap-5 p-3 '>
          {tasks.map((task, i) => (
            <div key={i} 
            className='bg-gray-800 rounded p-5 flex flex-col justify-between hover:scale-105 hover:cursor-pointer transition-all duration-300 '>
              <h1 className='font-bold'>{task.title}</h1>
              <p className='text-gray-400 my-2'>{task.desc}</p>
              <div className="func-buttons my-2 flex flex-col-3 gap-2 w-fit">
                <button onClick={() => handleEditButtonClick(task)}
                        className='bg-gray-700  p-2 rounded '><FaRegEdit /></button>
                <button onClick={() => handleDeleteTask(task._id)}
                        className='bg-gray-700  p-2 rounded '><RiDeleteBin6Line /></button>
              </div>
            </div>))} 
        </div>
      </div>
    </div>
  )
}

export default TaskArea