import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading:null,
  notification:null,
  error: null,
};

export const NotificationDataReducer = createReducer(initialState, {
  LOAD_NOTIFICATION_REQUEST: (state) => {
    state.loading = true;
    state.notification=null
    state.error = null;
  },
  LOAD_NOTIFICATION_SUCCESS: (state, action) => {

    state.notification = action.payload;
    state.error = null;
    state.loading = false;
  },
  LOAD_NOTIFICATION_FAIL: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});
