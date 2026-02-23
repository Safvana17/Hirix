import CompanyEntity from "../entities/company.entity";
import { IBaseRepository } from "./IBaseRepository";

export default interface ICompanyRepository extends IBaseRepository <CompanyEntity> {
    findByEmail(email: string): Promise<CompanyEntity | null>;
    updatePassword(id: string, hashedPassword: string): Promise<void>;
}