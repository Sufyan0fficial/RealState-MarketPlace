import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice  from "../Redux/userSlice";
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist'


const rootReducer = combineReducers({
    userSlice
})

const persistConfig = {
    key:'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store)
