import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../types';

interface AuthState {
    user: IUser | null;
}

const initialState: AuthState = {
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser | null>) => {
            state.user = action.payload;
            console.log('🚀 ~ state.user:', state.user);
        },
        clearUser: (state) => {
            state.user = null;
        },
    },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
