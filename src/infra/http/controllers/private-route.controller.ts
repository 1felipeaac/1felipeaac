
import { Controller,Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "@/infra/auth/jwt.auth.guard";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt-strategy";


@Controller('/private')
@UseGuards(JwtAuthGuard)
export class PrivateController {

    constructor(){}

    @Post()
    async handle(@CurrentUser() user: UserPayload){

        const sub = user
        console.log(sub)

        return 'free access'
    }

        
}