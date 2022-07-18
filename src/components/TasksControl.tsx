import React, { ChangeEvent, useState } from 'react';
import { Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import toDoStore from '../store/toDoStore';

interface TasksControlProps {
  setFilterTask: (filter: string) => void;
}

const TasksControl: React.FC<TasksControlProps> = observer((props) => {
  const { setFilterTask } = props;
  const { deleteIsDone, tasks } = toDoStore;
  const [activeButton, setActiveButton] = useState('all');

  const activeTasksCount = tasks.filter(({ isDone }) => !isDone).length;

  const handlerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setFilterTask(e.currentTarget.getAttribute('name') || '');
    setActiveButton(e.currentTarget.getAttribute('name') || '');
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
});

export default TasksControl;
