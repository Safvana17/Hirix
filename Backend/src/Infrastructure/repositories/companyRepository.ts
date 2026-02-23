import { CompanyMapper } from "../../Application/Mappers/CompanyMapper";
import CompanyEntity from "../../Domain/entities/company.entity";
import ICompanyRepository from "../../Domain/repositoryInterface/ICompanyRepository";
import { companyModel, ICompany } from "../database/Model/company";
import { BaseRepository } from "./baseRepository";

export class CompanyRepository extends BaseRepository<CompanyEntity, ICompany> implements ICompanyRepository {

    constructor(){
        super(companyModel)
    }
    async findByEmail(email: string): Promise<CompanyEntity | null> {
        const company = await this._model.findOne({email})
        if(!company) return null
        return CompanyMapper.toEntity(company)
    }

    async updatePassword(id: string, hashedPassword: string): Promise<void> {
        await this._model.findByIdAndUpdate(
            id,
            {$set: {password: hashedPassword}}
        )
    }

    async updateToken(id: string, token: string): Promise<void> {
        await this._model.findByIdAndUpdate(
            id,
            {$push: {refreshToken: token}}
        )
    }

    protected mapToEntity(doc: ICompany): CompanyEntity {
        return CompanyMapper.toEntity(doc)
    }

    protected mapToPersistance(entity: CompanyEntity): Partial<ICompany> {
        return CompanyMapper.toDocument(entity)
    }
}