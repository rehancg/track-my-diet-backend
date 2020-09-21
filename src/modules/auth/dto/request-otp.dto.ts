import { IsNotEmpty, Matches } from "class-validator";

export class RequestOtpDto {
    @IsNotEmpty()
    telNo: string
}