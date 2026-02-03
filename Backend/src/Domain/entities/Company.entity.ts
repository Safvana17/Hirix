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

    constructor(name: string, email: string, password: string, isVerified: boolean ,id?: string, googleId?: string){
        super(name, email, password, isVerified, id, userRole.Company, googleId)
    }

}