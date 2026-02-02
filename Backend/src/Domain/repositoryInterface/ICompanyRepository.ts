import companyEntity from "../entities/Company.entity";

export default interface ICompanyRepository {
    createCompany(company: companyEntity): Promise<companyEntity>;
    findByEmail(email: string): Promise<companyEntity | null>;
    findById(id: string): Promise<companyEntity | null>;
    updatePassword(id: string, hashedPassword: string): Promise<void>;
}