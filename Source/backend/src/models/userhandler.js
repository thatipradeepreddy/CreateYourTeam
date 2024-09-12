import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
    verified: { type: Boolean },
})

const UserVerificationSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    uniqueString: { type: String, required: true, unique: true },
    createdAt: { type: Date, required: true },
    expiresAt: { type: Date },
})

const passwordResetSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    resetString: { type: String, required: true, unique: true },
    createdAt: { type: Date, required: true },
    expiresAt: { type: Date },
})

const User = mongoose.model("tradeuserdb", UserSchema)

const UserVerification = mongoose.model("tradeuserverification", UserVerificationSchema)

const PasswordReset = mongoose.model("tradeuserpasswordreset", passwordResetSchema)

export { User, UserVerification, PasswordReset }
