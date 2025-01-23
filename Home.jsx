import React, { useState, useEffect } from 'react';  // Import useEffect
import axios from 'axios';
import Create from './Create';
import { BsCircleFill, BsFillTrashFill } from 'react-icons/bs'; // Import the icons

function Home() {
    const [todos, setTodos] = useState([]); // State to hold the list of todos

    useEffect(() => {
        // Fetch todos when the component mounts
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    // Handle deleting a todo
    const handleDelete = (id) => {
        // Send delete request to backend
        axios.delete(`http://localhost:3001/delete/${id}`)
            .then(() => {
                // Remove the deleted todo from the state using functional setState
                setTodos((prevTodos) => prevTodos.filter(todo => todo._id !== id));
            })
            .catch(err => console.log("Error deleting todo:", err));
    };

    return (
        <div className="home">
            <h2>Todo list</h2>
            <Create />
            {todos.length === 0
                ? <div><h2>No records</h2></div>
                : todos.map(todo => (
                    <div key={todo._id} className="task">
                        <div className="checkbox">
                            <BsCircleFill className="icon" />
                            <p>{todo.task}</p>
                        </div>
                        <div>
                            <span onClick={() => handleDelete(todo._id)}>
                                <BsFillTrashFill className="icon" />
                            </span>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Home;
