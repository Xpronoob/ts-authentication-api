import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    lastname: {
      type: String,
      // required: [true, 'Lastname is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    img: {
      type: String,
    },
    roles: {
      type: [String],
      default: ['USER_ROLE'],
      enum: ['USER_ROLE', 'ADMIN_ROLE', 'ADMIN_USERS', 'ADMIN_PRODUCTS'],
    },
    phone: {
      type: String,
      // required: [true, 'Phone number is required'],
    },
    address: {
      country: String,
      street: String,
      city: String,
      state: String,
      zip: String,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

export const UserModel = mongoose.model('User', userSchema)
