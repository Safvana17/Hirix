import userRole from "../enums/userRole.enum";

export default class userEntity {
    protected id?: string;
    protected name: string;
    protected email: string;
    protected password: string
    protected role?: userRole
    protected isVerified: boolean;
    protected googleId?: string;
    protected createdAt: Date;
    protected updatedAt: Date;


    protected constructor(name: string, email: string, password: string, isVerified: boolean, id?: string, role?: userRole, googleId?: string){
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

    public getId(): string | undefined {
        return this.id;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }

    public getRole(): userRole {
        return this.role!
    }

    public getName(): string {
        return this.name;
    }

    public isUserVerified(): boolean {
        return this.isVerified;
    }

    public markAsVerified(): void {
        this.isVerified = true;
    }
}