import type { User } from "@prisma/client";


//struktur data response
export type UserResponse = {
    username: string,
    name: string,
    token?: string
};


// struktur data request
export type CreateUserRequest = {
    username: string,
    name: string,
    password: string
};

// db helper
export function toUserResponse(user : User) {
    return {
        username: user.username,
        name: user.name
    }
}