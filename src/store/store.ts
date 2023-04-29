import { configureStore, Middleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import editSceneReducer from '@/features/scada-edit/EditViewport/editSceneSlice';
import monitorSceneReducer from '@/features/scada-monitor/monitorSceneSlice';
import scadaEditStateReducer from '@/features/scada-edit/scadaEditSlice';
import scadaPageReducer from '@/features/scada/scadaPageSlice';

const middlewares: Middleware<any, any>[] = [];
if (process.env.NODE_ENV === `development`) {
  // middlewares.push(logger);
}

const store = configureStore({
  reducer: {
    editScene: editSceneReducer,
    monitorScene: monitorSceneReducer,
    editViewport: scadaEditStateReducer,
    scadaPage: scadaPageReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type ReduxSelector<T> = (state: RootState) => T;
// Using the first syntax:

export default store;
