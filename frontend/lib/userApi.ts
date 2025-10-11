import { User, LogoutUserResponse, UserLogin, LoginUserResponse, UserRefreshToken } from "@/lib/types/userType";
import axiosInstance from "./axios";

export async function login (user: UserLogin) {
    const { email, password } = user

    try {
        const res = await axiosInstance.post<LoginUserResponse>("/users/login", {
            email,
            password
        })

        return res.data
    } catch (err: any) {
        console.error("API request failed:", err.response?.data || err.message);
        throw new Error(err.response?.data?.msg || "API request failed");
    }
}

export async function register(user: User) {
    const { username, email, password } = user

    try {
        const res = await axiosInstance.post<User>("/users/register", {
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
        const res = await axiosInstance.post<UserRefreshToken>("/users/token/refresh")
        return res.data
    } catch (err: any) {
        console.error("API request failed:", err.response?.data || err.message);
        throw new Error(err.response?.data?.msg || "API request failed");
    }
}

export async function LogoutUser() {
    try {
        const res = await axiosInstance.post<LogoutUserResponse>("/users/logout")
        return res.data
    } catch (err: any) {
        console.error("API request failed:", err.response?.data || err.message);
        throw new Error(err.response?.data?.msg || "API request failed");
    }
}