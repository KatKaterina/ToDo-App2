import React, { useState, useRef, useEffect } from 'react';
import {
  Row,
  Container,
  Col,
  Form,
} from 'react-bootstrap';

export const FormTask = ({ addTask, changeTask }) => {
  const [textTask, setTextTask] = useState('');

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (e) => {
    setTextTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(textTask);
    setTextTask('');
  };

  const handleClick = () => {
    changeTask();
  };

  return (
    <Row className="new-task">
      <div className="col-sm-2">
        <button type="button" className="button-control" onClick={handleClick}>✓</button>
      </div>
      <Col>
        <Form onSubmit={handleSubmit} role="form">
          <Row>
            <Col>
              <input className="input-task" type="text" data-testid="input-task" placeholder="What needs to be done?" value={textTask} onChange={handleChange} ref={inputRef} />
            </Col>
            <div className="col-sm-2">
              <button type="submit" className="button-control" onClick={handleSubmit}>+</button>
            </div>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export const Tasks = (props) => {
  const {
    allTasks,
    filterTask,
    changeTask,
    deleteTask,
  } = props;

  let filtredTasks = allTasks;
  if (filterTask === 'active') {
    filtredTasks = allTasks.filter(({ isDone }) => !isDone);
  } else if (filterTask === 'completed') {
    filtredTasks = allTasks.filter(({ isDone }) => isDone);
  }

  const handleChange = (id) => () => {
    changeTask(id);
  };

  const handleDelete = (id) => () => {
    deleteTask(id);
  };

  return (
    <div>
      {filtredTasks.map(({ id, text, isDone }) => (
        <Row key={id} className="task align-items-center">
          <div className="col-sm-2">
            <button
              className={isDone ? 'button-control checked' : 'button-control unchecked'}
              onClick={handleChange(id)}
              data-testid="button-checked"
              type="button"
            />
          </div>
          <Col>
            <Row>
              <div className="col">
                <span className={isDone ? 'complite-task' : 'active-task'}>{text}</span>
              </div>
              <div className="col-sm-2">
                <button
                  className="button-control"
                  onClick={handleDelete(id)}
                  type="button"
                >
                  x
                </button>
              </div>
            </Row>
          </Col>
        </Row>
      ))}
    </div>
  );
};

export const TasksControl = ({ setFilterTask, deleteIsDone, activeTasksCount }) => {
  const [activeButton, setActiveButton] = useState('all');
  const handlerClick = (e) => {
    setFilterTask(e.target.name);
    setActiveButton(e.target.name);
  };
  const itemsView = activeTasksCount === 1 ? `${activeTasksCount} item left` : `${activeTasksCount} items left`;
  return (
    <Row className="tasks-control justify-content-between align-items-center">
      <div className="col-sm-3">{itemsView}</div>
      <div className="col-sm-auto">
        <button
          className={activeButton === 'all' ? 'button-filter button-active' : 'button-filter'}
          name="all"
          onClick={handlerClick}
          data-testid="filter-non"
          type="button"
        >
          All
        </button>
      </div>
      <div className="col-sm-auto">
        <button
          className={activeButton === 'active' ? 'button-filter button-active' : 'button-filter'}
          name="active"
          onClick={handlerClick}
          data-testid="filter-active"
          type="button"
        >
          Active
        </button>
      </div>
      <div className="col-sm-auto">
        <button
          className={activeButton === 'completed' ? 'button-filter button-active' : 'button-filter'}
          name="completed"
          onClick={handlerClick}
          data-testid="filter-completed"
          type="button"
        >
          Completed
        </button>
      </div>
      <div className="col-sm-auto">
        <button
          className="button-filter"
          onClick={deleteIsDone}
          type="button"
        >
          Clear completed
        </button>
      </div>
    </Row>
  );
};

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filterTask, setFilterTask] = useState('all');

  const activeTasksCount = tasks.filter(({ isDone }) => !isDone).length;

  const addTask = (textTask) => {
    if (textTask.trim() === '') {
      return;
    }
    const id = `t${Date.now()}`;
    const newTask = { id, text: textTask, isDone: false };
    setTasks((prevTasks) => {
      const newTasks = [newTask, ...prevTasks];
      return newTasks;
    });
  };

  const changeTask = (idTask = null) => {
    const updatedTasks = tasks.map((item) => {
      if (idTask === null) {
        return activeTasksCount === 0 ? { ...item, isDone: false } : { ...item, isDone: true };
      }
      return item.id === idTask ? { ...item, isDone: !item.isDone } : item;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (idTask) => {
    const updatedTasks = tasks.filter((item) => item.id !== idTask);
    setTasks(updatedTasks);
  };

  const deleteIsDone = () => {
    const updatedTasks = tasks.filter(({ isDone }) => !isDone);
    setTasks(updatedTasks);
  };

  return (
    <div className="container-main container">
      <header>
        <Row>
          <h1 className="header-todo">todos</h1>
        </Row>
      </header>
      <main>
        <div className="container-todo">
          <Container>
            <FormTask addTask={addTask} changeTask={changeTask} />
            <Tasks
              allTasks={tasks}
              changeTask={changeTask}
              deleteTask={deleteTask}
              filterTask={filterTask}
            />
            <TasksControl
              setFilterTask={setFilterTask}
              deleteIsDone={deleteIsDone}
              activeTasksCount={activeTasksCount}
            />
          </Container>
        </div>
      </main>
    </div>
  );
};

export default App;
