import React, { Component } from 'react';

import { connect } from 'react-redux';

import CONSTANTS from '../../constants/';
import { setFilter } from '../../actions/filter';

import './index.scss';

class Filters extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      filter,
      setFilter
    } = this.props;

    return (
      <div className="filters">
        <button
          className={`filter ${filter === CONSTANTS.FILTER_ALL ? 'active' : ''}`}
          onClick={ () => setFilter(CONSTANTS.FILTER_ALL) }
        >
          All
        </button>
        <button
          className={`filter ${filter === CONSTANTS.FILTER_ACTIVE ? 'active' : ''}`}
          onClick={ () => setFilter(CONSTANTS.FILTER_ACTIVE) }
        >
          Active
        </button>
        <button
          className={`filter ${filter === CONSTANTS.FILTER_COMPLETED ? 'active' : ''}`}
          onClick={ () => setFilter(CONSTANTS.FILTER_COMPLETED) }
        >
          Completed
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
};

export default connect(mapStateToProps, { setFilter })(Filters)
