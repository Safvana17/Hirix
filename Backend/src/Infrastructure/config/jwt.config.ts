import { env } from "./env";

export const jwtConfig = {
    accessToken: {
        secret: env.JWT_ACCESS_SECRET,
        expiresIn: 900
    },
    refreshToken: {
        secret: env.JWT_REFRESH_SECRET,
        expiresIn: 60*60*24*7
    }
}