import candidateEntity from "../entities/Candidate.entity";

export default interface ICandidateRepository {
    createCandidate(candidate: candidateEntity): Promise<candidateEntity>;
    findById(id: string): Promise<candidateEntity | null>;
    findByEmail(email: string): Promise<candidateEntity | null>;
    save(candidate: candidateEntity): Promise<void>
    updatePassword(id: string, hashedPassword: string): Promise<void>;
}