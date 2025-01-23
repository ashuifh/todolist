import { useState } from 'react';
import axios from 'axios';

function Create() {
    const [task, setTask] = useState('');  // Initialize with an empty string

    const handleAdd = () => {
        if (task.trim()) {  // Ensure the task is not empty
            axios.post('http://localhost:3001/add', { task: task })
                .then(result => {
                    console.log(result);  // Handle successful response
                    setTask('');  // Clear the input field after successful addition
                })
                .catch(err => console.log(err));  // Handle error
        } else {
            alert('Please enter a task!');  // Show an alert if the task is empty
        }
    }

    return (
        <div className="create_form">
            <input
                type="text"
                placeholder="Enter Task"
                value={task}  // Bind the value of the input to the task state
                onChange={(e) => setTask(e.target.value)}  // Update task state when the input changes
            />
            <button type="button" onClick={handleAdd}>Add</button>
        </div>
    );
}

export default Create;
