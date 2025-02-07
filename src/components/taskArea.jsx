import React, { useEffect, useState } from "react";
import Task from "./task";
import axios from "axios";

function TaskArea() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/api/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
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
    setTitle("");
    setDesc("");
  };

  const handleNewTask = async (taskData) => {
    try {
      const response = await axios.post("/api/tasks", taskData);
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      console.error("Error creating task:", error);
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
          task._id === updatedTask._id
            ? { ...task, title: updatedTask.title, desc: updatedTask.desc }
            : task
        )
      );
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await axios.delete(`/api/tasks?id=${taskId}`);
      if (response.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        );
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditButtonClick = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDesc(task.desc);
  };

  return (
    <div className="p-4 w-full  ">
      <div className="flex p-4 items-center justify-between">
        <h1 className=" flex justify-center w-full font-bold text-white text-4xl">
          Task Management App!
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 mx-auto max-w-lg">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 bg-transparent border border-gray-700 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300"
            type="text"
            id="title"
            placeholder="Enter title here"
            required
          />
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="p-3 bg-transparent border border-gray-700 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300 w-full row"
            name="desc"
            rows="4"
            id="description"
            placeholder="Task description here!"
            required
          ></textarea>
          <button
            type="submit"
            className="p-4 bg-sky-500 rounded-lg my-5 hover:bg-sky-600 transition duration-300 w-full sm:w-[12rem] text-white font-semibold"
          >
            {editingTask ? "Save Changes" : "Add Task"}
          </button>
        </div>
      </form>
      <Task tasks={tasks}  handleEditButtonClick={handleEditButtonClick} handleDeleteTask={handleDeleteTask} />
    </div>
  );
}

export default TaskArea;
