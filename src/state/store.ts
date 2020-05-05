import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppState } from './types';
import { rootReducer } from './reducer/index';
import { appReducer } from './reducer/app';

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector
export const store = configureStore({
    reducer: appReducer
})
