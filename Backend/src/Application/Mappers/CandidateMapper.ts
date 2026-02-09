import candidateEntity from "../../Domain/entities/Candidate.entity";
import { ICandidate } from "../../Infrastructure/database/Model/Candidate";

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
            name: entity.getName(),
            email: entity.getEmail(),
            password: entity.getPassword(),
            role: entity.getRole(),
            googleId: entity.getGoogleId?.(),
            isVerified: entity.isUserVerified()
        }
    }
}