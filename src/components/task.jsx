import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";


const Task = ({ tasks, handleEditButtonClick, handleDeleteTask}) => {
  return (
    <>
      <div className="task mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task, i) => (
            <div
              key={i}
              className="bg-gray-800 rounded-lg p-5 flex flex-col  justify-between hover:scale-105 hover:cursor-pointer transition-all duration-300 shadow-lg"
            >
              <div className="flex gap-x-3 text-2xl  ">
                <p className="font-semibold">Title:</p>
                <h1 className="font-semibold text-white  ">{task.title}</h1>
              </div>

              <div className="flex gap-x-3  ">
                <p className="font-semibold">Description:</p>
                <p className="text-gray-400 ">{task.desc}</p>
              </div>

              <div className="func-buttons flex gap-3 mt-5 justify-center ">
                <button
                  onClick={() => handleEditButtonClick(task)}
                  className="bg-gray-700 p-2 rounded-lg text-white hover:bg-gray-600 transition duration-200"
                >
                  <FaRegEdit />
                </button>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="bg-gray-700 p-2 rounded-lg text-white hover:bg-gray-600 transition duration-200"
                >
                  <RiDeleteBin6Line />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Task;
