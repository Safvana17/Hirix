import AdminEntity from "../../Domain/entities/admin.entity";
import { IAdmin } from "../../Infrastructure/database/Model/admin";

export class AdminMapper {
    static toEntity(doc: IAdmin): AdminEntity {
        const admin = new AdminEntity(
            doc._id.toString(),
            doc.name,
            doc.email,
            doc.password,
            doc.role
        )

        return admin
    }

    static toDocument(entity: AdminEntity){
        return {
            name: entity.name,
            email: entity.email,
            role: entity.role
        }
    }
}