import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '@/types/Redux/authTypes';
import { getProfile, loginUser, logoutUser } from './authThunks';
import Cookies from 'js-cookie';

const initialState: AuthState = {
    user: null,
    token: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            if (typeof window !== 'undefined') {
                Cookies.remove('userToken');
            }
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isAuthenticated = true;
        },
        clearError: (state) => {
            state.error = null;
        },
        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        },
    },
    extraReducers: (builder) => {
        // Login cases
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload.data.user;
            state.token = action.payload.data.token;

            if (typeof window !== 'undefined') {
                Cookies.set('userToken', action.payload.data.token);
            }
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
            state.isAuthenticated = false;
        });

        // Get Profile cases
        builder.addCase(getProfile.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload.data;


        });
        builder.addCase(getProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
            state.isAuthenticated = false;

        });

        // logout
        builder.addCase(logoutUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });

        builder.addCase(logoutUser.fulfilled, (state) => {
            state.isLoading = false;
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;

            if (typeof window !== 'undefined') {
                Cookies.remove('userToken');
            }
        });

        builder.addCase(logoutUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;

        });
    },
});

export const { logout, setToken, clearError, updateUser } = authSlice.actions;
export default authSlice.reducer;