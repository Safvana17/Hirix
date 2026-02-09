import dotenv from 'dotenv'

dotenv.config()

export const env = {
    PORT: Number(process.env.PORT),
    MONGO_URI: String(process.env.MONGODB_URI),
    JWT_REFRESH_SECRET: String(process.env.JWT_REFRESH_SECRET),
    JWT_ACCESS_SECRET: String(process.env.JWT_ACCESS_SECRET),
    REDIS_URL: process.env.REDIS_URL as string,
    NODEMAILER_USER: process.env.NODEMAILER_EMAIL,
    NODEMAILER_PASS: process.env.NODEMAILER_PASSWORD,
    HIRIX_EMAIL: process.env.HIRIX_EMAIL
}