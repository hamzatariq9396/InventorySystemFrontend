// /store/index.js
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer from './reducers'; // Your combined reducers

const store = configureStore({
  reducer: rootReducer,

});

const ReduxStoreProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export default ReduxStoreProvider;