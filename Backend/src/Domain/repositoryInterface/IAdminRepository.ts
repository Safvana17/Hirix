import adminEntity from "../entities/Admin.entity";

export default interface IAdminRepository {
    findByEmail(email: string): Promise<adminEntity | null>
}