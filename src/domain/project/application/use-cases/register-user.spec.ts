import { InMemoryUsersRepository } from "test/repository/in-memory-users-repository";
import { RegisterUserUseCase } from "./register-user";
import { FakeHasher } from "test/cryptography/fake-hasher";

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: RegisterUserUseCase
let fakeHasher: FakeHasher

describe('Register User', () => {
    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository()
        fakeHasher = new FakeHasher()
        sut = new RegisterUserUseCase(inMemoryUsersRepository, fakeHasher)
    })

    it('should be able to register a new User', async () => {
        const result = await sut.execute({
            name: 'teste',
            email: 'teste@email.com',
            password: '123456'
        })

        expect(result.isRight()).toBe(true)
        expect(result.value).toEqual({
            user: inMemoryUsersRepository.items[0]
        })
    })

    it('should hash user password upon register', async () => {
        const result = await sut.execute({
            name: 'teste',
            email: 'teste@email.com',
            password: '123456'
        })

        const hashedPassword = await fakeHasher.hash('123456')

        expect(result.isRight()).toBe(true)
        expect(inMemoryUsersRepository.items[0].password).toEqual(hashedPassword)
    } )
})