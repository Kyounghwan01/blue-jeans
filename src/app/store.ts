import { configureStore, combineReducers, EnhancedStore, AnyAction } from '@reduxjs/toolkit';
import userSlice from 'features/userSlice';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import logger from 'redux-logger';

export type RootState = ReturnType<typeof combinedReducers>;

const combinedReducers = combineReducers({
	user: userSlice,
});

const reducer = (state: RootState | undefined, action: AnyAction) => {
	if (action.type === HYDRATE) {
		return { ...state, ...action.payload };
	}
	return combinedReducers(state, action);
};

const setupStore = (): EnhancedStore => store;

const makeStore = () => setupStore();

export const store = configureStore({
	reducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
	devTools: process.env.NODE_ENV !== 'production',
});

export const wrapper = createWrapper(makeStore, { debug: process.env.NODE_ENV !== 'production' });

export type AppDispatch = typeof store.dispatch;

// https://github.com/hugotox/nextjs-starter
