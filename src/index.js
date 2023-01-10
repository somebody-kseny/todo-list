import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './drop_default.css';
import './index.scss';
import "./todo/todo.scss";

import { widget } from './widget.js';

window.w = widget;

ReactDOM.render(
  <App />,
  document.getElementById('root')
);