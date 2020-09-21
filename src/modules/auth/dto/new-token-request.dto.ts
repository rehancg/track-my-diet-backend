import { IsNotEmpty } from "class-validator";

export class NewTokenRequestDto {
    @IsNotEmpty()
    accessToken: string

    @IsNotEmpty()
    refreshToken: string
}