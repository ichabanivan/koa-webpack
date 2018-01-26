import React, { Component } from 'react';

import { connect } from 'react-redux';

import CONSTANTS from '../../constants/';
import { hideModalError } from '../../actions/modal';

class ModalError extends Component {
  constructor(props) {
    super(props);
  }

  handleHide = (e) => {
    e.preventDefault();
    this.props.hideModalError()
  };

  stopPropagation = (e) => {
    e.stopPropagation();
  };

  render() {
    const { isVisible } = this.props;

    if (isVisible) {
      return (
        <div>
          <div className="modal-overlay" onClick={ this.handleHide }>
            <form className="modal" onClick={ this.stopPropagation }>
              <div className="modal-content">
                <h4> Error </h4>
              </div>
              <div className="modal-footer">
                <button
                  className="modal-action"
                  onClick={ this.handleHide }
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
  return {
    isVisible: state.modals[CONSTANTS.MODAL_ERROR].isVisible
  }
};

export default connect(mapStateToProps, { hideModalError })(ModalError);
