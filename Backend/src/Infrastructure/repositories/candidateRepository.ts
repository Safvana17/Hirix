import candidateEntity from "../../Domain/entities/Candidate.entity";
import ICandidateRepository from "../../Domain/repositoryInterface/ICandidateRepository";
import { candidateMapper } from "../database/Mappers/CandidateMapper";
import { candidateModel } from "../database/Model/Candidate";

export class candidateRepository implements ICandidateRepository{

    async createCandidate(candidate: candidateEntity): Promise<candidateEntity> {
        const candidateData = candidateMapper.toDocument(candidate)
        const savedCandidate = await candidateModel.create(candidateData)
        return candidateMapper.toEntity(savedCandidate)
    }
    
    async findByEmail(email: string): Promise<candidateEntity | null> {
        const candidate = await candidateModel.findOne({email})

        if(!candidate) return null

        return candidateMapper.toEntity(candidate)
    }

    async findById(id: string): Promise<candidateEntity | null> {
        const candidate = await candidateModel.findById({id})
        if(!candidate) return null
        return candidateMapper.toEntity(candidate)
    }

    async save(candidate: candidateEntity): Promise<void> {
        const candidateData = candidateMapper.toDocument(candidate)

        const updatedCandidate = await candidateModel.findByIdAndUpdate(
            candidate.getId(),
            candidateData,
            {new: true}
        )

        if(!updatedCandidate){
            throw new Error ('Candidate not found')
        }
    }

    async updatePassword(id: string, hashedPassword: string): Promise<void> {
        await candidateModel.findByIdAndUpdate(
            id, 
            {$set: {password: hashedPassword}}
        )
    }
}