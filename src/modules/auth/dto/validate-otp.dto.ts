import { IsNotEmpty, Matches } from "class-validator";

export class ValidateOtpDto {
    @IsNotEmpty()
    telNo: string

    @IsNotEmpty()
    referenceNo: string

    @IsNotEmpty()
    otp: number
}