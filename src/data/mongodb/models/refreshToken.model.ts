import mongoose, { Schema } from 'mongoose'

const refreshTokenSchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User id is required'],
  },
  token: {
    type: String,
    required: [true, 'Token is required'],
  },
  expires_at: {
    type: Date,
    required: [true, 'Expires at is required'],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
})

export const RefreshTokenModel = mongoose.model('RefreshToken', refreshTokenSchema)
