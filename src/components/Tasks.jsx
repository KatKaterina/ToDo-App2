import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import toDoStore from '../store/toDoStore';

const Tasks = observer((props) => {
  const { filterTask } = props;
  const { tasks, changeTask, deleteTask } = toDoStore;
  let filtredTasks = tasks;
  if (filterTask === 'active') {
    filtredTasks = tasks.filter(({ isDone }) => !isDone);
  } else if (filterTask === 'completed') {
    filtredTasks = tasks.filter(({ isDone }) => isDone);
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
              aria-label="checked"
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
});

export default Tasks;
