import { IsNotEmpty, Matches } from "class-validator";

export class RequestOtpDto {
    @IsNotEmpty()
    @Matches(/^[0-9]{10}$/g)
    telNo: number
}