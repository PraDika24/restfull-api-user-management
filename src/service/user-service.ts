import { prismaClient } from "../application/database";
import type { CreateUserRequest } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validate } from "../validation/validation";

export class UserService {

    //return promise karena fungsi asyc
    static async register(request : CreateUserRequest ) : Promise<UserResponse> {

        const registerRequest = Validate.validate(UserValidation.REGISTER, request);

        const totalUserWithSameUsername = await prismaClient.user.count({
            where:{
                username: registerRequest.username
            }
        });

        if(totalUserWithSameUsername !== 0 ) {
            throw
        }
    }
}