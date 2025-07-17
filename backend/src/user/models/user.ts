import { Schema, model, InferSchemaType, HydratedDocument } from 'mongoose'

const userSchema = new Schema({
  username: {
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
    enum: ['admin', 'cliente'],
    default: 'cliente'
  }
})

// Generate TypeScript types from the schema
export type UserType = InferSchemaType<typeof userSchema>

// Generate a type for the hydrated document
export type UserDocument = HydratedDocument<UserType>

export const User = model('User', userSchema)
