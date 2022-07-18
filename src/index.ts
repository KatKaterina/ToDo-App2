import ReactDom from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';
import init from './init';

const render = () => {
  const vdom = init();
  ReactDom.render(vdom, document.getElementById('todo'));
};

render();
