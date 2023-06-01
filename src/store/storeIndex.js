import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import postReducer from './postSlice';
import commentReducer from './commentSlice';

export default configureStore({
  reducer: {
    userSlice: userReducer,
    postSlice: postReducer,
    commentSlice: commentReducer,
  },
});
