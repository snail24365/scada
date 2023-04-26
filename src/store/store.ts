import { configureStore, Middleware } from '@reduxjs/toolkit';
import editSceneReducer from '@/features/scada-edit/EditViewport/editSceneSlice';
import logger from 'redux-logger';
import scadaEditSlice from '@/features/scada-edit/scadaEditSlice';

const middlewares: Middleware<any, any>[] = [];
if (process.env.NODE_ENV === `development`) {
  //middlewares.push(logger);
}

const store = configureStore({
  reducer: {
    editScene: editSceneReducer,
    editViewport: scadaEditSlice,
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
