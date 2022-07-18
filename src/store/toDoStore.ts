import { makeAutoObservable } from 'mobx';
import { Task } from '../types/data';

const localStorageKey = 'todo-app';

const initState:  Array<Task> = localStorage.getItem(localStorageKey)
  ? JSON.parse(localStorage.getItem(localStorageKey) || '{}')
  : [];

class ToDo {
  tasks: Array<Task> = initState;

  constructor() {
    makeAutoObservable(this);
  }

  addTask = (textTask: string) => {
    const id = `t${Date.now()}`;
    const newTask: Task = { id, text: textTask, isDone: false };
    this.tasks.push(newTask);
    localStorage.setItem(localStorageKey, JSON.stringify(this.tasks));
  };

  deleteTask = (idTask: string) => {
    this.tasks = this.tasks.filter((item) => item.id !== idTask);
    localStorage.setItem(localStorageKey, JSON.stringify(this.tasks));
  };

  changeTask = (idTask: string | null = null) => {
    const activeTasksCount = this.tasks.filter(({ isDone }) => !isDone).length;
    const updatedTasks = this.tasks.map((item) => {
      if (idTask === null) {
        return activeTasksCount === 0 ? { ...item, isDone: false } : { ...item, isDone: true };
      }
      return item.id === idTask ? { ...item, isDone: !item.isDone } : item;
    });
    this.tasks = updatedTasks;
    localStorage.setItem(localStorageKey, JSON.stringify(this.tasks));
  };

  deleteIsDone = () => {
    this.tasks = this.tasks.filter(({ isDone }) => !isDone);
    localStorage.setItem(localStorageKey, JSON.stringify(this.tasks));
  };
}

export default new ToDo();
