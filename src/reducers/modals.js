import CONSTANTS from '../constants/';

const initialState = {
  [CONSTANTS.MODAL_STATUS]: {
    isVisible: false
  },
  [CONSTANTS.MODAL_ERROR]: {
    isVisible: false
  },
  [CONSTANTS.MODAL_REMOVE]: {
    isVisible: false
  }
};

export default function modals(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.MODAL_ERROR:
      return {
        ...initialState,
        [CONSTANTS.MODAL_ERROR]: {
          isVisible: true
        }
      };

    case CONSTANTS.MODAL_REMOVE:
      return {
        ...initialState,
        [CONSTANTS.MODAL_REMOVE]: {
          isVisible: true
        }
      };

    case CONSTANTS.MODAL_STATUS:
      return {
        ...initialState,
        [CONSTANTS.MODAL_STATUS]: {
          isVisible: true
        }
      };

    case CONSTANTS.HIDE_MODALS:
      return initialState;

    default:
      return state;
  }
}
