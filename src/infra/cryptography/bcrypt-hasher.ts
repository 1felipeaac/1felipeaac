import { HashComparer } from "@/domain/project/application/cryptography/hash-comparer";
import { HashGenerator } from "@/domain/project/application/cryptography/hash-generator";
import { hash, compare } from "bcryptjs";

export class BCryptHasher implements HashGenerator, HashComparer {

    private HASH_SALT_LENGTH = 8

    hash(plain: string): Promise<string> {
        return hash(plain, this.HASH_SALT_LENGTH)
    }
    compare(plain: string, hash: string): Promise<boolean> {
        return compare(plain, hash)
    }

}