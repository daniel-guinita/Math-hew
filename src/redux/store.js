import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './theme/themeSlice';
import userReducer from './user/userSlice';

const store = configureStore({
    reducer: {
        theme: themeReducer,
        user: userReducer,
    },
});

export default store;