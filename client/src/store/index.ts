// node_modules
import {
    AnyAction,
    combineReducers,
    configureStore,
    Reducer,
  } from "@reduxjs/toolkit";
  
  // slices
  import formsSlice from "./form-slice";
  import scrapingSlice from "./scraping-slice";
  
  const combinedReducer = combineReducers({
    forms: formsSlice.reducer,
    scraping: scrapingSlice.reducer,
  });
  
  export type RootState = ReturnType<typeof combinedReducer>;
  
  export type AppDispatch = typeof store.dispatch;
  
  const rootReducer: Reducer = (
    state: ReturnType<typeof store.getState>,
    action: AnyAction
  ) => {
    return combinedReducer(state, action);
  };
  
  const store = configureStore({
    reducer: rootReducer,
  });
  
  export default store;
  