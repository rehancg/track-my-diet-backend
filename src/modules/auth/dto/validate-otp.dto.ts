import { IsNotEmpty, Matches } from "class-validator";

export class ValidateOtpDto {
    @IsNotEmpty()
    referenceNo: string

    @IsNotEmpty()
    otp: number
}