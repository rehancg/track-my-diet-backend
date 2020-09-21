import { SubscriptionStatus } from "src/modules/user/user.entity";

export interface ISubscriptionStatus {
    statusCode: string;
    statusDetails: string;
    subscriptionStatus: SubscriptionStatus;
    version: String;
}