import "./styles.css";
import React, { useEffect, useState } from "react";
// import {
//   getAllToDo,
//   createToDo,
//   deleteToDo,
//   updateToDo,
// } from "../ToDoList";



function ToDoList() {


  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const getuser=async ()=>{
    const response=await fetch("https://playground.4geeks.com/todo/users/chris0keith")
    if (!response.ok){
      await fetch("https://playground.4geeks.com/todo/users/chris0keith",{
        method:'posT'
      }) 
return
    }
    const data=await response.json()
    setTasks(data.todos)
  }
useEffect(()=>{
  getuser()
},[])

  // useEffect(() => {
  //   async function fetchToDos() { // Fetching the todo happens here?
  //     const todos = await getAllToDo();
  //     setTasks(todos); // getAllToDo must return an array
  //   }
  //   fetchToDos();
  // }, []);

  const addTask = async () => {
    if (input.trim()) {
      const newTask = { label: input, isCompleted: false };
      // const createdTask = await createToDo(newTask); // This relies on the import
      // setTasks([...tasks, createdTask]); // relied on the import
      setTasks([...tasks, newTask]); // version that doesn't use the import
      setInput("");
    }
  };

  const toggleCompletion = async (index) => {
    const task = tasks[index];
    const updatedTask = { ...task, isCompleted: !task.isCompleted };
    // await updateToDo(task.id, updatedTask); // relied on the import
    const newTasks = [...tasks];
    newTasks[index] = updatedTask;
    setTasks(newTasks);
  };

  const deleteTask = async (index) => {
    const task = tasks[index];
    // await deleteToDo(task.id); // relied on the import
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const completedTasksCount = tasks.filter((task) => task.isCompleted).length;

  return (
    <div className="ToDoList" style={{ position: "relative" }}>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTask()}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            className={task.isCompleted ? "completed" : ""}
            style={{
              textDecoration: task.isCompleted ? "line-through" : "none",
            }}
          >
            {task.label}
            <button onClick={() => toggleCompletion(index)}>
              {task.isCompleted ? "Mark as Uncompleted" : "Mark as Completed"}
            </button>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className="counter">
        Total Tasks: {tasks.length} | Completed: {completedTasksCount}
      </div>
    </div>
  );
}

export default ToDoList;
