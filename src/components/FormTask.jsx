import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import toDoStore from '../store/toDoStore';

const FormTask = () => {
  const [textTask, setTextTask] = useState('');
  const { addTask, changeTask } = toDoStore;

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (e) => {
    setTextTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (textTask) {
      addTask(textTask);
      setTextTask('');
    }
  };

  return (
    <Row className="new-task">
      <div className="col-sm-2">
        <button type="button" className="button-control" onClick={() => changeTask()}>✓</button>
      </div>
      <Col>
        <Form onSubmit={handleSubmit} role="form">
          <Row>
            <Col>
              <input
                className="input-task"
                type="text"
                placeholder="What needs to be done?"
                value={textTask}
                onChange={handleChange}
                ref={inputRef}
                data-testid="input-task"
              />
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

export default FormTask;
