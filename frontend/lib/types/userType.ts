    export type User = {
        username: string, 
        email: string,
        password: string
    }

    export type UserLogin = {
        email: string,
        password: string,
    }

    export type LoginUserResponse = {
        email: string,
        password: string,
    }

    export type UserFetchResponse = {
        username: string,
        email: string,
    }

    export type UserRefreshToken = {
        message: string,
        user: {
            user_id: string,
            email: string,
            username: string
        }
    }

    export type LogoutUserResponse = {
        message: string
    }