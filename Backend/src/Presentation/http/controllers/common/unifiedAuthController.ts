import { Request, Response, NextFunction } from "express"
import { statusCode } from "../../../../Shared/Enumes/statusCode"
import  { authMessages } from '../../../../Shared/constsnts/messages/authMessages'
import { IUnifiedGetMeUsecase } from "../../../../Application/common/interfaces/IUnifiedGetMeUsecase"
import { UnifiedGetMeInputDTO } from "../../../../Application/common/dtos/unified.getme.dto"
import { success } from "zod"

export class UnifiedAuthController {
    constructor(
        private _unifiedGetMeUsecase: IUnifiedGetMeUsecase
    ) {}

    getMe = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.id
            const role = req.user?.role

            if(!req.user){
                return res.status(statusCode.UNAUTHORIZED).json({
                    success: false,
                    message: authMessages.error.UNAUTHORIZED
                })
            }
            const payload: UnifiedGetMeInputDTO = {
                id: userId,
                role: role
            }

            const user = await this._unifiedGetMeUsecase.execute(payload)
            return res.status(statusCode.OK).json({
                success: true,
                user
            })
        } catch (error) {
            next(error)
        }
    }
}