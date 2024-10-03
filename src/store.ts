// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../src/features/user/userSlice';
import blogReducer from '../src/features/blog/blogSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    blogs: blogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
