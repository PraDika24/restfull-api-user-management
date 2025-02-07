import type { User } from "@prisma/client";


//struktur data response
export type UserResponse = {
    username: string,
    name: string,
    token?: string
};


// struktur data request regiter
export type CreateUserRequest = {
    username: string,
    name: string,
    password: string
};

// struktur data request login
export type LoginUserRequest = {
    username: string,
    password: string
};

export type UpdateUserRequest = {
    name?: string,
    password?: string
};


// db helper
export function toUserResponse(user : User) : UserResponse {
    return {
        username: user.username,
        name: user.name
    }
}