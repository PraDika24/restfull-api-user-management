import type { Contact, User } from "@prisma/client";
import { prismaClient } from "../src/application/database";

export const apiKey = Bun.env.API_KEY;

export class UserTest {
    static async delete(){
        await prismaClient.user.deleteMany({
            where: {

                username : "userTest"
            }
        })
    }

    static async create() {

        const hashedPassword = await Bun.password.hash("userTest12", {
            algorithm: "bcrypt",
            cost:10
        });
        
        await prismaClient.user.create({
           data:{
            username: "userTest",
            name: "userTest",
            password: hashedPassword
           }
        })
    }

    static async createAuth() {

        const hashedPassword = await Bun.password.hash("userTest12", {
            algorithm: "bcrypt",
            cost:10
        });
        
        await prismaClient.user.create({
           data:{
            username: "userTest",
            name: "userTest",
            password: hashedPassword,
            token:"test"
           }
        })
    }


    static async get(): Promise<User> {
        const user = await prismaClient.user.findFirst({
            where: {
                username:'userTest'
            }
        });

        if (!user) {
            throw new Error('User not Found')
        }

        return user;
    }
}



export class ContactTest {
    static async deleteAll() {
        await prismaClient.contact.deleteMany({
            where: {
                username: 'userTest'
            }
        })
    }
}