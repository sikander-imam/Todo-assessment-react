import React, { useState, useEffect } from "react";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");

  useEffect(() => {
    const initialTodos = [
      {
        id: 1,
        title: "Finish homework",
        description: "Complete math assignment",
        done: false,
      },
      {
        id: 2,
        title: "Go for a run",
        description: "Jog in the park for 30 minutes",
        done: false,
      },
    ];
    setTodos(initialTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e) => {
    setInputTitle(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputTitle.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      title: inputTitle,
      description: inputDescription,
      done: false,
    };

    setTodos([newTodo, ...todos]);
    setInputTitle("");
    setInputDescription("");
  };

  const handleTodoToggle = (todo) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((t) => {
        if (t.id === todo.id) {
          return { ...t, done: !t.done };
        }
        return t;
      });

      const sortedTodos = updatedTodos.sort((a, b) => {
        if (a.done && !b.done) return 1;
        if (!a.done && b.done) return -1;
        return 0;
      });

      return sortedTodos;
    });
  };

  const handleTodoDelete = (todo) => {
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
  };

  return (
    <div className="bg-gradient-to-b from-indigo-700 to-purple-700 min-h-screen flex flex-col items-center justify-center">
      <header className="text-4xl text-white mb-8">TODO LIST</header>
      <form className="flex items-center mb-4" onSubmit={handleFormSubmit}>
        <input
          type="text"
          className="rounded-md px-4 py-2 bg-gray-200 text-gray-700 focus:outline-none focus:bg-white"
          placeholder="Enter a todo title..."
          value={inputTitle}
          onChange={handleInputChange}
        />
        <input
          type="text"
          className="rounded-md px-4 py-2 ml-2 bg-gray-200 text-gray-700 focus:outline-none focus:bg-white"
          placeholder="Enter a todo description..."
          value={inputDescription}
          onChange={(e) => setInputDescription(e.target.value)}
        />
        <button
          type="submit"
          className="bg-white text-purple-700 px-4 py-2 rounded-md hover:bg-purple-700 hover:text-white transition duration-300 ml-2"
        >
          Add
        </button>
      </form>
      <ul className="w-1/3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`bg-white px-4 py-2 mb-4 flex items-center justify-between rounded-md ${
              todo.done ? "line-through" : ""
            }`}
          >
            <div>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => handleTodoToggle(todo)}
              />
              <span className="ml-2">{todo.title}</span>
            </div>
            <div>
              <button
                className="text-red-700 hover:text-red-900 focus:outline-none mr-2"
                onClick={() => handleTodoDelete(todo)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
