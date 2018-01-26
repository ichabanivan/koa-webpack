import React, { Component } from 'react';

import { connect } from 'react-redux';

import { chooseModal } from '../../actions/modal';

import Input from '../Input/';
import TodoList from '../TodoList/';

import ModalError from '../ModalError/';
import ModalRemoveTodo from '../ModalRemoveTodo/';
import ModalChangeStatus from '../ModalChangeStatus/';

class Todos extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    body: ''
  };

  componentDidMount() {
    const {
      chooseModal,
      match

    } = this.props;

    const {
      todo
    } = this.props;

    if (todo) {
      this.setState({
        body: todo.body
      })
    }

    chooseModal(match.params.modal, match.params.id)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.todo) {
      this.setState({
        body: nextProps.todo.body
      })
    }

    // If url was changed
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.props.chooseModal(nextProps.match.params.modal, nextProps.match.params.id)
    }
  }

  render() {

    const { id } = this.props.match.params;

    return (
      <div>
        <Input _id={id} />
        <TodoList _id={id} />

        <ModalError />
        <ModalRemoveTodo _id={id} />
        <ModalChangeStatus _id={id} />
      </div>
    );
  }
}

export default connect(null, { chooseModal })(Todos)
