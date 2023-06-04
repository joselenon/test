import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducers = persistReducer(
    {
      key: 'authgamblance',
      storage,
      whitelist: ['auth'],
    },

    reducers
  );

  const persistedReducersWithSelectedBalance = persistReducer(
    {
      key: 'selectedBalance',
      storage,
      whitelist: ['balance'],
    },
    persistedReducers
  );

  return persistedReducersWithSelectedBalance;
};
