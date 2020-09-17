export class ValidateOtpResponseDto {
    subscriptionStatus: string;
    subscriberId: string;
    statusCode: string;
    statusDetails: string;
    version: String;
}

export enum SubscriptionStatus {
    CHARGING_PENDING = 'INITIAL CHARGING PENDING',
    REGISTERED = 'REGISTERED'
}

export enum OtpStatus {
    SUCCESS = 'S1000'
}