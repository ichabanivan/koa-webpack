import ACTIONS from '../constants/';

import { push } from 'react-router-redux'

export const updateTodo = (todo, _id) => {
  return async dispatch => {
    todo.modified = new Date().toLocaleDateString();
    
    if (todo.body) {

      try {
        let response = await fetch('/updateTodo', {
          method: 'PUT',
          body: JSON.stringify(todo)
        })

        let res = await response.json();

        if (response.ok) {
          dispatch({
            type: ACTIONS.UPDATE_TODO,
            todo: res.value
          });
          dispatch(push(`/${_id}`))
        } else {
          dispatch(push(`/${_id}/error`));
        }
      } catch (error) {
        console.error('Response was not received')
        dispatch(push(`/${_id}/error`));
      }
    }
  }
};

// export const resetText = () => ({
//   type: ACTIONS.RESET_TEXT
// });

export const newText = (text) => ({
  type: ACTIONS.NEW_TEXT,
  text
});

// export const removeTodo = (_id) => {
//   return {
//     type: ACTIONS.REMOVE_TODO,
//     _id
//   };
// };

export const changeStatus = (todo) => {
  return {
    type: ACTIONS.UPDATE_TODO,
    todo
  };
};

export function addNewTodo(text) {
  return async (dispatch, getState) => {
    let date = new Date().toLocaleDateString();

    let state = getState();
    let isUnic = true,
      id = Math.floor(Math.random() * 10000).toString();

    // if empty
    if (!text) {
      dispatch(push(`/${ id }/error`));
      return false
    }

    state.todos.forEach((todo) => {
      if ( todo.body === text ) {
        isUnic = false
      }
    });

    let todo = {
      created: date,
      modified: date,
      body: text,
      status: 'new'
    };

    if (isUnic) {
      try {
        let response = await fetch('/addTodo', {
          method: 'POST',
          body: JSON.stringify(todo)
        })
        let res = await response.json()
        dispatch({
          type: ACTIONS.ADD_TODO,
          todo: res
        });
        dispatch({
          type: ACTIONS.RESET_TEXT
        })
      } catch (error) {
        console.error('Response was not received')
        dispatch(push(`/${id}/error`));
      }
    } else {
      dispatch(push(`/${id}/error`));
    }
  };
}

export function actionRemoveTodo(_id) {
  return async (dispatch) => {
    try {
      let response = await fetch(`/${_id}`, {
        method: 'DELETE'
      })
      let res = await response.json()

      if (res.ok) {
        dispatch({
          type: ACTIONS.REMOVE_TODO,
          _id
        });
        dispatch({
          type: ACTIONS.RESET_TEXT
        });
        dispatch(push('/'));
      } else {
        dispatch(push(`/${_id}/error`));
      }
    } catch (error) {
      console.error('Response was not received')
      dispatch(push(`/${_id}/error`));
    }
  }
}

export function actionChangeStatus(_id, status) {
  return async (dispatch, getState) => {
    let modified = new Date().toLocaleDateString();
    let state = getState();
    let todo = state.todos.filter((todo) => _id === todo._id)[0];
    todo.status = status;
    todo.modified = modified;

    try {
      let response = await fetch('/updateTodo', {
        method: 'PUT',
        body: JSON.stringify(todo)
      })

      let res = await response.json()

      if (res.ok) {
        dispatch({
          type: ACTIONS.UPDATE_TODO,
          todo: res.value
        });
      } else {
        dispatch(push(`/${_id}/error`));
      }
    } catch (error) {
      dispatch(push(`/${_id}/error`));
    }
  };
}

export function initTodos() {
  return async (dispatch) => {
    try {
      let response = await fetch('/getTodos', {
        method: 'POST'
      });

      let todos = await response.json()

      dispatch({
        type: ACTIONS.INIT_TODOS,
        todos
      })
    } catch (error) {
      console.error('Response was not received')
    }
  }
}
