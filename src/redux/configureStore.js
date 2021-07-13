import { createStore, applyMiddleware } from "redux";
import indexReducer from "./reducers/index.reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import customStorage from "./customStorage";

const configureStore = () => {
  const persistConfig = {
    key: "iblogkey",
    storage: customStorage,
  };

  const store = createStore(
    persistReducer(persistConfig, indexReducer),
    composeWithDevTools(applyMiddleware(thunk)),
  );

  const persistor = persistStore(store);

  return { store, persistor };
};

export default configureStore;
