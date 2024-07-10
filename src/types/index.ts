export interface ModerationConfig {
  aiProviders: {
    textAI: string
    imageAI: string
    videoAI: string
  }
  licenseSecretKey: string
}

export interface ModerationResult {
  isApproved: boolean
  flaggedContent: string[]
}

export interface Content {
  type: 'text' | 'image' | 'video'
  data: string
}
