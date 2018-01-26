import { push } from 'react-router-redux';

export function pushTo(url) {
  return (dispatch) => {
    dispatch(push(url));
  };
}
