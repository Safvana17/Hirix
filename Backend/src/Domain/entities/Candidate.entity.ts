import userRole from "../enums/userRole.enum";
import userEntity from "./User.entity";

export default class candidateEntity extends userEntity{
    
    subscriptionId?: string;

    constructor(id: string, name: string, email: string, password: string, googleId: string, isVerified: boolean){
        super(id, name, email, password, userRole.Candidate, googleId, isVerified)
    }
}