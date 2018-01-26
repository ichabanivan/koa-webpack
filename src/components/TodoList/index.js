import React, { Component } from 'react';

import { connect } from 'react-redux';

import CONSTANTS from '../../constants';
import TodoItem from '../TodoItem/';

import './index.scss';

class TodoList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      todos,
      _id
    } = this.props;
    return (
      <div className="todo__list">
        {
          todos.map((todo) => {
            return <TodoItem isActive={_id === todo._id } key={ Math.random() } todo={ todo } />
          })
        }
      </div>
    );
  }
}

const filterTodos = (todos, filter, text) => {
  switch (filter) {
    case CONSTANTS.FILTER_ALL:
      return todos.filter((todo) => {
        return todo.body.indexOf(text) !== -1;
      });
    case CONSTANTS.FILTER_COMPLETED:
      return todos.filter((todo) => {
        return todo.status === 'completed' && todo.body.indexOf(text) !== -1;
      });
    case CONSTANTS.FILTER_ACTIVE:
      return todos.filter((todo) => {
        return (todo.status === 'new' || todo.status === 'in progress') && todo.body.indexOf(text) !== -1;
      });
  }
};

const mapStateToProps = (state) => {
  return {
    todos: filterTodos(state.todos, state.filter, state.inputText)
  }
};

export default connect(mapStateToProps, null)(TodoList)
