import userRole from "../enums/userRole.enum";

export default class adminEntity {
    id: string;
    name: string;
    email: string;
    password: string;
    role: userRole;
    createdAt: Date;
    updateAt: Date;

    constructor(id: string, name: string, email: string, password: string, role: userRole){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.createdAt = new Date();
        this.updateAt = new Date()
    }
}