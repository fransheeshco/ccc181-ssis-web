import { User, LogoutUserResponse, UserLogin, LoginUserResponse, UserRefreshToken } from "@/lib/types/userType";
import axiosInstance from "./axios";

export async function login(user: UserLogin) {
    const { email, password } = user

    try {
        const res = await axiosInstance.post<LoginUserResponse>("/login", {  // Remove "/users"
            email,
            password
        })

        return res.data
    } catch (err: any) {
        const backendMessage =
            err.response?.data?.message ||  // Flask returns { message: "..." }
            err.response?.data?.error ||    // sometimes { error: "..." }
            err.message ||
            "API request failed";

        console.error("API request failed:", backendMessage);
        throw new Error(
            err.response?.data?.error ||
            err.response?.data?.message ||
            "API request failed"
        );
    }
}

export async function register(user: User) {
    const { username, email, password } = user

    try {
        const res = await axiosInstance.post<User>("/register", {  // Remove "/users"
            username,
            email,
            password
        })

        return res.data
    } catch (err: any) {
        console.error("API request failed:", err.response?.data || err.message);
        throw new Error(err.response?.data?.msg || "API request failed");
    }
}

export async function RefreshUser() {
    try {
        const res = await axiosInstance.post<UserRefreshToken>("/token/refresh")  // Remove "/users"
        return res.data
    } catch (err: any) {
        console.error("API request failed:", err.response?.data || err.message);
        throw new Error(err.response?.data?.msg || "API request failed");
    }
}

export async function LogoutUser() {
    try {
        const res = await axiosInstance.post<LogoutUserResponse>("/logout")  // Remove "/users"
        return res.data
    } catch (err: any) {
        console.error("API request failed:", err.response?.data || err.message);
        throw new Error(err.response?.data?.msg || "API request failed");
    }
}