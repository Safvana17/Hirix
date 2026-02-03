import userRole from "../enums/userRole.enum";
import userEntity from "./User.entity";

export default class candidateEntity extends userEntity{
    
    subscriptionId?: string;

    constructor(name: string, email: string, password: string, isVerified: boolean, id?: string, googleId?: string){
        super(name, email, password,isVerified, id, userRole.Candidate, googleId)
    }
}