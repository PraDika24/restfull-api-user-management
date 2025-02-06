import { prismaClient } from "../src/application/database";

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
}