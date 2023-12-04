// /store/reducers/index.js
import { combineReducers } from 'redux';
import { NotificationDataReducer } from 'src/reducers/notification';
import { socketReducerReducer } from 'src/reducers/sockets';


const rootReducer = combineReducers({
  notificationData:NotificationDataReducer,
  socketData:socketReducerReducer,
});

export default rootReducer;
