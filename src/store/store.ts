import { configureStore } from '@reduxjs/toolkit';
import dataSlice from './dataSlice';
import authSlice from './authSlice';

const store = configureStore({
  reducer: {
    datas: dataSlice,
    auth: authSlice,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
