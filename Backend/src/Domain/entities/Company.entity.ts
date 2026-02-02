import userRole from "../enums/userRole.enum";
import UserEntity from "./User.entity";

export default class companyEntity extends UserEntity{
    legalName?: string;
    domain?: string;
    teamSize?: number;
    about?: string;

    phoneNumber?: string;
    streetName?: string;
    country?: string;
    state?: string;
    city?: string;
    pinCode?: string;

    subscriptionId?: string;

    constructor(id: string, name: string, email: string, password: string, googleId: string, isVerified: boolean){
        super(id, name, email, password, userRole.Company, googleId, isVerified)
    }

}