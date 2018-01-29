import React, { Component } from 'react';

import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { initTodos } from '../actions/todo';

import Todos from './Todos/';
import Filters from './Filters/';

import 'normalize.css';
import './index.scss';

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.initTodos()
  }

  render() {
    return (
      <div className="todo">

        <h1>Todos</h1>
        <Filters />
        <Route path="/:id?/:modal?" component={ Todos } />

      </div>
    );
  }
}

export default connect(null, { initTodos })(App)
