import React, { useState } from 'react';
import { Row, Container } from 'react-bootstrap';
import FormTask from './FormTask';
import Tasks from './Tasks';
import TasksControl from './TasksControl';

const App: React.FC = () => {
  const [filterTask, setFilterTask] = useState<string>('all');
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
            <FormTask />
            <Tasks filterTask={filterTask} />
            <TasksControl setFilterTask={setFilterTask} />
          </Container>
        </div>
      </main>
    </div>
  );
};

export default App;
