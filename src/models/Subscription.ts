// src/models/Subscription.ts

import mongoose, { Document, Schema } from 'mongoose'

export interface ISubscription extends Document {
  userId: string
  licenseKey: string
  plan: string
  status: 'active' | 'expired' | 'revoked'
  expiresAt: Date
  createdAt: Date
  updatedAt: Date
}

const SubscriptionSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  licenseKey: { type: String, required: true, unique: true },
  plan: { type: String, required: true },
  status: {
    type: String,
    enum: ['active', 'expired', 'revoked'],
    required: true,
  },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export default mongoose.model<ISubscription>('Subscription', SubscriptionSchema)
