import { configureStore } from '@reduxjs/toolkit';
import todoListReducer from './slice/todoListSlice';

const store = configureStore({
  reducer: {
    todo: todoListReducer,
  },
});

export default store;