import { Either, left, right } from "@/core/either"
import { WrongCredentialsError } from "./errors/wrong-credentials-error"
import { Injectable } from "@nestjs/common"
import { UsersRepository } from "../repository/users-repository"
import { HashComparer } from "../cryptography/hash-comparer"
import { Encrypter } from "../cryptography/encrypter"

interface AuthenticateUsersUseCaseRequest {
    email: string,
    password: string
}

type AuthenticateUsersUseCaseResponse = Either<WrongCredentialsError, {
    accessToken: string
}>

@Injectable()
export class AuthenticateUsersUseCase {
    constructor(
        private userRepository: UsersRepository,
        private hashComparer: HashComparer,
        private encrypter: Encrypter
    ){}

    async execute({email, password}:AuthenticateUsersUseCaseRequest):Promise<AuthenticateUsersUseCaseResponse>{
        const user = await this.userRepository.findByEmail(email)

        if(!user){
            return left(new WrongCredentialsError())
        }

        const isPasswordValid = await this.hashComparer.compare(password, user.password)

        if(!isPasswordValid){
            return left(new WrongCredentialsError())
        }

        const accessToken = await this.encrypter.encrypt({sub: user.id.toString()})

        return right({
            accessToken
        })
    }
}