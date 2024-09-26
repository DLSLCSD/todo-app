import React, { useState } from 'react';
import { InputGroup, Form, Button, ListGroup } from 'react-bootstrap';
import './App.css';

function App() {
  const [task, setTask] = useState(''); 
  const [taskList, setTaskList] = useState([]); 
  const [editIndex, setEditIndex] = useState(null); 
  const [editTask, setEditTask] = useState(''); 
  const [completedTasks, setCompletedTasks] = useState([]); 


  const handleAddTask = () => {
    if (task.trim() !== '') {
      setTaskList([...taskList, task]); 
      setCompletedTasks([...completedTasks, false]); 
      setTask(''); 
    }
  };

  const handleRemoveTask = (indexToRemove) => {
    setTaskList(taskList.filter((_, index) => index !== indexToRemove)); 
    setCompletedTasks(completedTasks.filter((_, index) => index !== indexToRemove)); 
  };

 
  const handleEditTask = (index) => {
    setEditIndex(index); 
    setEditTask(taskList[index]); 
  };


  const handleSaveEdit = (index) => {
    const updatedTasks = [...taskList];
    updatedTasks[index] = editTask; 
    setTaskList(updatedTasks);
    setEditIndex(null); 
  };

  const handleCompleteTask = (index) => {
    const updatedCompletedTasks = [...completedTasks];
    updatedCompletedTasks[index] = true; 
    setCompletedTasks(updatedCompletedTasks);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center task-item">
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">Add Task</InputGroup.Text>
          <Form.Control
           style={{ 
            width: "400px",
            height: "20px",
            fontSize: "18px", 
            fontFamily: "Courier New"
            }}
            value={task}
            onChange={(e) => setTask(e.target.value)} 
            aria-label="Task"
            aria-describedby="inputGroup-sizing-sm"
          />
          <Button variant="outline-primary" className="custom-button" onClick={handleAddTask}>
            Add
          </Button>
        </InputGroup>
      </div>

      {taskList.length === 0 ? (
      
        <ListGroup>
        <p>No todos available. Add a todo to get started!</p>
        </ListGroup>
      ) : (
        <ListGroup>
          {taskList.map((taskItem, index) => (
            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center task-item">
              {editIndex === index ? (
               
                <>
                  <Form.Control
                    value={editTask}
                    onChange={(e) => setEditTask(e.target.value)} 
                    aria-label="Edit Task"
                  />
                  <Button
                    variant="outline-success"
                    className="ms-2"
                    onClick={() => handleSaveEdit(index)}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  {}
                  <span
                    className={`task-name ${completedTasks[index] ? 'text-decoration-line-through' : ''}`}
                  >
                    {taskItem}
                  </span>
                  <div className="task-buttons">
                    <Button
                      variant="outline-success"
                      className="ms-2"
                      onClick={() => handleEditTask(index)} 
                      disabled={completedTasks[index]} 
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      className="ms-2"
                      onClick={() => handleRemoveTask(index)} 
                      disabled={completedTasks[index]} 
                    >
                      Remove
                    </Button>
                    <Button
                      variant="outline-warning"
                      className="ms-2"
                      onClick={() => handleCompleteTask(index)} 
                      disabled={completedTasks[index]} 
                    >
                      Complete
                    </Button>
                  </div>
                </>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
}

export default App;
