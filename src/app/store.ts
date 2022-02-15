import {
  configureStore,
  combineReducers,
  EnhancedStore,
  AnyAction
} from "@reduxjs/toolkit";
import commonSlice from "features/commonSlice";
import userSlice from "features/userSlice";
import qnaSlice from "features/qnaSlice";
import foodKioskSlice from "features/kiosk/foodKioskSlice";
import transportationKioskSlice from "features/kiosk/transportationKioskSlice";
import movieKioskSlice from "features/kiosk/movieKioskSlice";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import logger from "redux-logger";

export type RootState = ReturnType<typeof combinedReducers>;

const combinedReducers = combineReducers({
  user: userSlice,
  qna: qnaSlice,
  common: commonSlice,
  foodKiosk: foodKioskSlice,
  transportationKiosk: transportationKioskSlice,
  movieKiosk: movieKioskSlice
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
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
  devTools: process.env.NODE_ENV !== "production"
});

export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== "production"
});

export type AppDispatch = typeof store.dispatch;
