import { AuthService } from "@/services/Auth/authService";
import { LoginPayload } from "@/types/Redux/authTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAxiosErrorMessage } from "../reduxError";
import { ProfileService } from "@/services/Profile/ProfileServices";


export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials: LoginPayload, { rejectWithValue }) => {
        try {
            const response = await AuthService.login(credentials);

            return {
                status: true,
                message: response.data.message,
                data: {
                    user: response.data.data.user,
                    token: response.data.data.token
                }
            };
        } catch (err) {
            return rejectWithValue(getAxiosErrorMessage(err));
        }
    }
);

export const getProfile = createAsyncThunk(
    'auth/getProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await ProfileService.getProfile();
            return response.data;
        } catch (err) {
            return rejectWithValue(getAxiosErrorMessage(err));
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await AuthService.logout();
            return response.data;
        } catch (err) {
            return rejectWithValue(getAxiosErrorMessage(err));
        }
    }
);
