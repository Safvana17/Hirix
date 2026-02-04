import { Types } from "mongoose";
import candidateEntity from "../../../Domain/entities/Candidate.entity";
import { ICandidate } from "../Model/Candidate";

export class candidateMapper {
    static toEntity(doc: ICandidate): candidateEntity {
        const candidate = new candidateEntity(
            doc.name,
            doc.email,
            doc.password,
            doc.isVerified,
            doc._id.toString(),
            doc.googleId
        )
        return candidate
    }

    static toDocument(entity: candidateEntity){
        return {
            _id: new Types.ObjectId(entity.getId()),
            name: entity.getName(),
            email: entity.getEmail(),
            password: entity.getPassword(),
            role: entity.getRole(),
        }
    }
}