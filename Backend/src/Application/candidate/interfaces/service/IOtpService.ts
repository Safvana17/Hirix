export interface IOtpService {
    generate(): string;
    hash(otp: string): string;
    compare(EnteredOtp: string, hashedOtp: string) : boolean;
}