import { IsNotEmpty } from "class-validator";

export class AdminAuthRequestDto {
    @IsNotEmpty()
    password: string
}