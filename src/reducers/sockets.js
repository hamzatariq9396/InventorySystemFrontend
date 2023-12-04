import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading:null,
  socket:null,
  error: null,
};

export const socketReducerReducer = createReducer(initialState, {
  LOAD_SOCKET_REQUEST: (state) => {
    state.loading = true;
    state.socket=null
    state.error = null;
  },
  LOAD_SOCKET_SUCCESS: (state, action) => {

    state.socket = action.payload;
    state.error = null;
    state.loading = false;
  },
  LOAD_SOCKET_FAIL: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});
