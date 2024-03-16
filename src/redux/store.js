import { configureStore,Tuple } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';
import sessionStorage from 'redux-persist/es/storage/session'
import { persistReducer, persistStore } from 'redux-persist';
import { thunk } from 'redux-thunk'


const persistConfig={
  key: "root", 
  storage:sessionStorage,
}

const persistState=persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistState,middleware:()=>new Tuple(thunk)
},
);

export const  persistor = persistStore(store);

export default store;