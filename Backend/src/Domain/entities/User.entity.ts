import userRole from "../enums/userRole.enum";

export default class userEntity {
    protected id: string;
    protected name: string;
    protected email: string;
    protected password: string
    protected role: userRole
    protected isVerified: boolean;
    protected googleId?: string;
    protected createdAt: Date;
    protected updatedAt: Date;


    protected constructor(id: string, name: string, email: string, password: string, role: userRole, googleId: string, isVerified: boolean,){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.isVerified = isVerified;
        this.googleId = googleId;
        this.createdAt = new Date();
        this.updatedAt = new Date()
    }
}