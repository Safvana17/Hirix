import nodemailer from 'nodemailer'
import { env } from './env'


export const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
        user: env.NODEMAILER_USER,
        pass: env.NODEMAILER_PASS
    } 
})