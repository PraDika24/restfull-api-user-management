import type { Address, Contact, User } from "@prisma/client";
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

    static async create() {
        await prismaClient.contact.create({
            data: {
                firstname: 'Windah',
                lastname: 'Basudara',
                email: 'windah@mail.com',
                phone: '08123456789',
                username: 'userTest'
            }
        })
    }

    static async get() : Promise<Contact> {
        const recordContact = await prismaClient.contact.findFirst({
            where: {
                username: "userTest"
            }
        });

        if (!recordContact) {
            throw new Error('Contact not Found')
        }

        return recordContact;
    }
}


export class AddressTest {
    static async deleteAll(){
        await prismaClient.address.deleteMany({
            where: {
                contact: {
                    username: "userTest"
                }
            }
        })
    }

    static async create() {
        const contact = await ContactTest.get();
        await prismaClient.address.create({
            data: {
                contact_id: contact.id,
                street: 'jalan test',
                city: 'city test',
                province: 'province test',
                country: 'country test',
                postal_code: '1234'
            }
        })
    }

    static async get() : Promise<Address>{

        const address = await prismaClient.address.findFirst({
            where: {
                contact: {
                    username: 'userTest'
                }
            }
        });

        if(!address) {
            throw new Error('Address Not Found')
        }

        return address;
    }
}