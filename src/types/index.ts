// src/types/index.ts

export interface ModerationConfig {
  aiProviders: {
    textAI: string
    imageAI: string
    videoAI: string
  }
  licenseSecretKey: string
  backendUrl: string
  rateLimitPoints: number
  rateLimitDuration: number
  cacheTTL: number
}

export interface ModerationResult {
  isApproved: boolean
  flaggedContent: string[]
}

export interface Content {
  type: 'text' | 'image' | 'video'
  data: string
}

export interface LicensePayload {
  type: LicenseType
  limit: number
  expiresAt: number
  userId: string
}

export enum LicenseType {
  INDIVIDUAL = 'individual',
  SMALL_BUSINESS = 'small_business',
  ENTERPRISE = 'enterprise',
  PAY_AS_YOU_GO = 'pay_as_you_go',
}
