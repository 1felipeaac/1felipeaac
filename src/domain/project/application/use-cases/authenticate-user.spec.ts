import { InMemoryUsersRepository } from "test/repository/in-memory-users-repository";
import { AuthenticateUsersUseCase } from "./authenticate-user";
import { FakeHasher } from "test/cryptography/fake-hasher";
import { FakeEncrypter } from "test/cryptography/fake-encrypter";
import { makeUser } from "test/factories/make-user";

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: AuthenticateUsersUseCase
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter

describe('Authenticate User', () => {
    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository()
        fakeEncrypter = new FakeEncrypter()
        fakeHasher = new FakeHasher()
        sut = new AuthenticateUsersUseCase(inMemoryUsersRepository, fakeHasher, fakeEncrypter)
    })

    it('should be able to authenticate a user', async () => {
        const user = makeUser({
            email: 'test@email.com',
            password: await fakeHasher.hash('123456')
        })

        inMemoryUsersRepository.items.push(user)

        const result = await sut.execute({
            email: 'test@email.com',
            password: '123456'
        })

        expect(result.isRight()).toBe(true)
        expect(result.value).toEqual({
            accessToken: expect.any(String)
        })
    })
})