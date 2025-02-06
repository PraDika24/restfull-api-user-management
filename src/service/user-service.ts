import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { toUserResponse, type CreateUserRequest, type LoginUserRequest, type UserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validate } from "../validation/validation";

export class UserService {

    //return promise karena fungsi asyc
    static async register(request : CreateUserRequest ) : Promise<UserResponse> {

        //validasi request menggunakan validate generic
        const registerRequest = Validate.validate(UserValidation.REGISTER, request);

        // menjumlahkan jika ada username sama
        const totalUserWithSameUsername = await prismaClient.user.count({
            where:{
                username: registerRequest.username
            }
        });

        // jika username ada maka throw error pada response-eror akan dibangkitkan
        if(totalUserWithSameUsername !== 0 ) {
            throw new ResponseError(400, "Username Already Exist")
        }

        // jika tidak maka lanjut hashing password
        registerRequest.password = await Bun.password.hash(registerRequest.password, {
            algorithm: "bcrypt",
            cost:10
        })

        // data request yang tervalidasi akan di insert ke db
        const user = await prismaClient.user.create({
            data: registerRequest
        })

        // mengembalikan promise 
        return toUserResponse(user);


    }

    static async login(request : LoginUserRequest ) : Promise<UserResponse> {
        const loginRequest = Validate.validate(UserValidation.LOGIN, request);

    }
}