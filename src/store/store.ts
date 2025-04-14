import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from '@/store/features/user/authSlice';
import userReducer from '@/store/features/user/userSlice';
import geminiReducer from '@/store/features/gemini/geminiSlice';
import gameReducer from '@/store/features/game/gameSlice'; // ✅ your coin state

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  gemini: geminiReducer,
  game: gameReducer, // ✅ register game slice
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'user', 'game'], // ✅ only persist these slices
  blacklist: ['gemini'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
