import React, { Component } from 'react';

import { connect } from 'react-redux';

import CONSTANTS from '../../constants/';

import { hideModalAndChangeStatus, hideModalChangeStatus } from '../../actions/modal';

class ModalChangenewStatus extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    newStatus: 'new'
  };

  componentDidMount() {
    this.setState({
      newStatus: this.props.status
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      newStatus: nextProps.status
    })
  }

  handleHide = (e) => {
    e.preventDefault();
    this.props.hideModalChangeStatus()
  };

  stopPropagation = (e) => {
    e.stopPropagation();
  };

  agree = (e) => {
    e.preventDefault();
    let status = this.state.newStatus;

    this.props.hideModalAndChangeStatus(this.props._id, status)
  };

  disagree = (e) => {
    e.preventDefault();
    this.props.hideModalChangeStatus();
  };

  changeStatus = (e) => {
    this.setState({
      newStatus: e.target.value
    })
  };

  render() {
    const { status, isVisible } = this.props;
    const { newStatus } = this.state;

    if (isVisible) {
      return (
        <div>
          <div className="modal-overlay" onClick={ this.handleHide }>
            <form className="modal" onClick={ this.stopPropagation }>
              <div className="modal-content">
                <h4> Do you want change status? </h4>

                <select defaultValue={ status } onChange={ this.changeStatus }>
                  <option value="new">new</option>
                  <option value="in progress">in progress</option>
                  <option value="review">review</option>
                  <option value="completed">completed</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  className="modal-action"
                  onClick={ this.disagree }
                > Disagree </button>

                <button
                  className="modal-action"
                  onClick={ this.agree }
                  disabled={ newStatus === status }
                > Agree </button>
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      return null
    }
  }
}

const mapStateToProps = (state) => {
  let todo = state.todos.filter((todo) => todo._id === state._id)[0];

  return {
    status: todo ? todo.status : null,
    isVisible: state.modals[CONSTANTS.MODAL_STATUS].isVisible
  }
};

export default connect(mapStateToProps, { hideModalAndChangeStatus, hideModalChangeStatus })(ModalChangenewStatus)

