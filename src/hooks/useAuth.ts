import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/store/store';
import { toast } from 'react-toastify';
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';
import { getProfile, logoutUser } from '@/store/slices/authThunks';

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, token, isLoading, error, isAuthenticated } = useSelector(
        (state: RootState) => state.auth
    );
    const router = useRouter();



    const handleLogout = async () => {
        try {
            const response = await dispatch(logoutUser()).unwrap();
            console.log("logout response : ", response)


            Cookies.remove("userToken");
            router.push("/");
            toast.success(response?.message || "Logged out successfully");

        } catch (err) {
            console.log("Logout failed", err);

        }
    };
    const fetchProfile = async () => {
        return await dispatch(getProfile()).unwrap();
    };

    return {
        user,
        token,
        isLoading,
        error,
        isAuthenticated,
        logout: handleLogout,
        fetchProfile,
    };
};