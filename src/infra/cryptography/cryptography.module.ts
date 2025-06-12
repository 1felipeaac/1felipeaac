import { Encrypter } from "@/domain/project/application/cryptography/encrypter";
import { Module } from "@nestjs/common";
import { JwtEncrypter } from "./jwt-encrypter";
import { HashComparer } from "@/domain/project/application/cryptography/hash-comparer";
import { BCryptHasher } from "./bcrypt-hasher";
import { HashGenerator } from "@/domain/project/application/cryptography/hash-generator";

@Module({
    providers: [
        { provide: Encrypter, useClass: JwtEncrypter },
        { provide: HashComparer, useClass: BCryptHasher },
        { provide: HashGenerator, useClass: BCryptHasher },
    ],
    exports: [ Encrypter, HashComparer, HashGenerator ]
})
export class CryptographyModule{}