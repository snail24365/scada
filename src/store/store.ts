import { configureStore, Middleware } from '@reduxjs/toolkit';
import editSceneReducer from '../features/scada/EditViewport/editSceneSlice';
import logger from 'redux-logger';
import editViewportSlice from '@/features/scada/EditViewport/editViewportSlice';

const middlewares: Middleware<any, any>[] = [];
if (process.env.NODE_ENV === `development`) {
  //middlewares.push(logger);
}

const store = configureStore({
  reducer: {
    editScene: editSceneReducer,
    editViewport: editViewportSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type ReduxSelector<T> = (state: RootState) => T;
// Using the first syntax:

export default store;
