import mongoose, { Types, Document, Schema, Model } from "mongoose";
import userRole from "../../../Domain/enums/userRole.enum";


export interface IAdmin extends Document {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: userRole;
    createdAt: Date;
    updatedAt: Date
}

const adminSchema: Schema<IAdmin> = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: userRole.Admin,
        enum: Object.values(userRole)
    }
},{
    timestamps: true
})

export const adminModel: Model<IAdmin> = mongoose.model<IAdmin>('Admin', adminSchema)