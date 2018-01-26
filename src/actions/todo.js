import ACTIONS from '../constants/';

import { push } from 'react-router-redux'

export const updateTodo = (todo, _id) => {
  return dispatch => {
    todo.modified = new Date().toLocaleDateString();
    
    if (todo.body) {
      fetch('/updateTodo', {
        method: 'POST',
        body: JSON.stringify(todo)
      })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        if (response) {
          dispatch({
            type: ACTIONS.UPDATE_TODO,
            todo: response
          });
          dispatch(push(`/${ _id }`))
        } else {
          dispatch(push(`/${ _id }/error`));
        }
      })
      .catch(error => console.log(error));
    } else {
      dispatch(push(`/${ _id }/error`));
    }
  }
};
export const resetText = () => ({
  type: ACTIONS.RESET_TEXT
});

export const newText = (text) => ({
  type: ACTIONS.NEW_TEXT,
  text
});

export const addTodo = (todo) => {
  return {
    type: ACTIONS.ADD_TODO,
    todo
  }
};

export const removeTodo = (_id) => {
  return {
    type: ACTIONS.REMOVE_TODO,
    _id
  };
};

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
      console.log(todo);
      try {
        let response = await fetch('/addTodo', {
          method: 'POST',
          body: JSON.stringify(todo)
        });

        let res = await response.json()
        console.log(res);

        dispatch({
          type: ACTIONS.ADD_TODO,
          todo: res
        });
        dispatch(resetText())
      } catch (error) {
        console.error('Response was not received')
        dispatch(push(`/${id}/error`));
      }
    }
  };
}

export function actionRemoveTodo(_id) {
  return (dispatch) => {
    fetch('/removeTodo', {
      method: 'POST',
      body: _id
    })
    .then(response => response.json())
    .then(response => {
      if (response.ok) {
        dispatch(removeTodo({
          type: ACTIONS.REMOVE_TODO,
          _id
        }));
        dispatch(resetText());
        dispatch(push('/'));
      } else {
        dispatch(push(`/${_id}/error`));
      }
    })
    .catch(error => console.log(error));
  }
}

export function actionChangeStatus(_id, status) {
  return (dispatch, getState) => {
    let modified = new Date().toLocaleDateString();
    let state = getState();
    let todo = state.todos.filter((todo) => _id === todo._id)[0];
    todo.status = status;
    todo.modified = modified;

    fetch('/updateTodo', {
      method: 'POST',
      body: JSON.stringify(todo)
    })
    .then(response => response.json())
    .then(response => {
      if (response) {
        dispatch(changeStatus(response));
      } else {
        dispatch(push(`/${_id}/error`));
      }
    })
    .catch(error => console.log(error));
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
