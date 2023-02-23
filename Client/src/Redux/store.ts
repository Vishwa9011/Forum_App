import { legacy_createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Reducer as AuthReducer } from "./Auth/auth.reducer";
import { Reducer as PostReducer } from "./Post/post.reducer";

declare global {
     interface Window {
          __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
     }
}


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const RootReducers = {
     auth: AuthReducer,
     post: PostReducer
}

export const store = legacy_createStore(combineReducers(RootReducers), composeEnhancers(applyMiddleware(thunk)));


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;


type DisppatchFn = () => AppDispatch;
export const useAppDispatch: DisppatchFn = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;