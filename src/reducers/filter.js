import CONSTANTS from '../constants/';

export default function filter(state = CONSTANTS.FILTER_ALL, action) {
  switch (action.type) {
    case CONSTANTS.FILTER_ALL:
      return CONSTANTS.FILTER_ALL;

    case CONSTANTS.FILTER_ACTIVE:
      return CONSTANTS.FILTER_ACTIVE;

    case CONSTANTS.FILTER_COMPLETED:
      return CONSTANTS.FILTER_COMPLETED;

    default:
      return state;
  }
}
