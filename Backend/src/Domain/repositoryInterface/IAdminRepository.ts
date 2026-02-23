import AdminEntity from "../entities/admin.entity";
import { IBaseRepository } from "./IBaseRepository";

export default interface IAdminRepository extends IBaseRepository <AdminEntity> {
    findByEmail(email: string): Promise<AdminEntity | null>
}