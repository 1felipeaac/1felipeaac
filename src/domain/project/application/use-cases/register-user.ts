import { Either, left, right } from "@/core/either";
import { UserAlreadyExistsError } from "./errors/user-already-exists-eror";
import { User } from "../../enterprise/entities/user";
import { HashGenerator } from "../cryptography/hash-generator";
import { UsersRepository } from "../repository/users-repository";
import { Injectable } from "@nestjs/common";

interface RegisterUserUseCaseRequest {
    name: string,
    email: string,
    password: string,
}

type RegisterUserUseCaseResponse = Either<UserAlreadyExistsError, { user: User}>

@Injectable()
export class RegisterUserUseCase {
    constructor(
        private userRepository: UsersRepository,
        private hashGenerator: HashGenerator
        ){}

    async execute(
        {name, email, password}: RegisterUserUseCaseRequest
    ): Promise<RegisterUserUseCaseResponse>{
        const userWithSameEmail = await this.userRepository.findByEmail(email)

        if (userWithSameEmail){
            return left(new UserAlreadyExistsError(email))
        }
        
        const hashPassword = await this.hashGenerator.hash(password)

        const user = User.create({
            email,
            name,
            password: hashPassword
        })

        await this.userRepository.create(user)

        return right({user})
    }
}