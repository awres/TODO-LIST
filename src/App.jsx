import React, { useState } from 'react'; // Importing React and useState hook, which enables using state in functional components
import { Button, Card, Form, Container, Row, Col } from 'react-bootstrap'; // Importing Button, Card, Form, Container, Row, and Col components from the react-bootstrap library, which will be used in the application
import './index.css'; // Importing a CSS file containing custom styles for the application

/**
 * TodoApp component responsible for managing tasks.
 */
const TodoApp = () => {
  // State for managing tasks
  const [tasks, setTasks] = useState([]);
  // State for managing task input field
  const [taskInput, setTaskInput] = useState('');
  // State for managing title input field
  const [titleInput, setTitleInput] = useState('');

  /**
   * Function to handle adding a new task to the list.
   */
  const handleAddTask = () => {
    if (taskInput.trim() !== '') {
      const newTask = {
        id: Math.random().toString(36).substr(2, 9),
        title: titleInput,
        description: taskInput.trim()
      };
      setTasks([...tasks, newTask]);
      setTaskInput('');
      setTitleInput('');
    }
  };

  /**
   * Function to handle deleting a task from the list.
   * @param {string} taskId - The id of the task to be deleted.
   */
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  /**
   * Function to handle editing a task description.
   * @param {string} taskId - The id of the task to be edited.
   * @param {string} newDescription - The new description of the task.
   */
  const handleEditTask = (taskId, newDescription) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, description: newDescription };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100"> {/* Container for the entire application, centered */}
      <Row> {/* Row */}
        <Col md={8}> {/* Column for the content, width on medium and larger devices */}
          <h1 className="text-center mb-4">TO-DO List by awres</h1> {/* Application header, centered */}
          <Form.Group controlId="titleForm"> {/* Form group for the task title input field */}
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="taskForm"> {/* Form group for the new task input field */}
            <Form.Control
              type="text"
              placeholder="Enter task"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleAddTask} block>Add Task</Button> {/* Button to add a new task */}
          <hr /> {/* Divider line */}
          <Row className="justify-content-center"> 
            {tasks.map(task => (  
              <Col key={task.id} xs={12} md={6} className="mb-3"> {/* Column for each card */}
                <Card className="look"> {/* Task card */}
                  <Card.Body> {/* Card content */}
                    <h3>{task.title}</h3> {/* Task title */}
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={task.description}
                      onChange={(e) => handleEditTask(task.id, e.target.value)}
                    /><br></br> {/* Task description */}
                    <Button variant="danger" className="mt-2" onClick={() => handleDeleteTask(task.id)}>Delete</Button> {/* Button to delete the task */}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default TodoApp; // Exporting the TodoApp component
