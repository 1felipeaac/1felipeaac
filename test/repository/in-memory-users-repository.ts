import { UsersRepository } from "@/domain/project/application/repository/users-repository";
import { User } from "@/domain/project/enterprise/entities/user";

export class InMemoryUsersRepository implements UsersRepository{
    public items: User[] = []
    async findByEmail(email: string){
        const user = this.items.find((item) => item.email === email)

        if(!user){
            return null
        }

        return user
    }
    async create(user: User){
        this.items.push(user)
    }

}