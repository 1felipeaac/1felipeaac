import { Module } from "@nestjs/common";
import { AuthenticateController } from "./controllers/authenticate.controller";
import { CreateAccountController } from "./controllers/create-account.controller";
import { PrivateController } from "./controllers/private-route.controller";
import { PrismaService } from "../database/prisma/prisma.service";
import { RegisterUserUseCase } from "@/domain/project/application/use-cases/register-user";
import { AuthenticateUsersUseCase } from "@/domain/project/application/use-cases/authenticate-user";

Module({
    controllers: [
        CreateAccountController, 
        AuthenticateController, 
        PrivateController
    ],
    providers: [ PrismaService, RegisterUserUseCase, AuthenticateUsersUseCase ]
})
export class HttpModule {}