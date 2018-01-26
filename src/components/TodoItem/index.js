import React, { Component } from 'react';

import { connect } from 'react-redux';
import { pushTo } from '../../actions/push';

import './index.scss';

class TodoItem extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const {
      todo,
      pushTo,
      isActive
    } = this.props;

    let activeClass = isActive ? 'item--active': '';

    return (
      <div className={`todo__item item ${activeClass}`} >
        <div className="item__top">
          <button
            className="item__label"
            onClick={() => pushTo(`/${todo._id}/change-label`)}
          > { todo.status } </button>

          <span className="item__text">{ todo.body }</span>

          <div className="item__btns">
            <button
              className="item__delete"
              onClick={() => pushTo(`/${todo._id}/remove-todo`)}
            > X </button>
            <button
              className="item__edit"
              onClick={() => pushTo(`/${todo._id}`)}
            > edit </button>
          </div>
        </div>

        <div>
          <div>Created: { todo.created } </div>
          <div>Мodified: { todo.modified } </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { pushTo })(TodoItem)
