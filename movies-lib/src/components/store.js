import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './moveSlice';

export const store = configureStore({
  reducer: {
    movie: movieReducer,
  },
});
