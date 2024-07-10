import { Request, Response } from 'express'
import { ContentModerationService } from '../services/ContentModerationService'
import { LicenseService } from '../services/LicenseService'
import { ModerationConfig } from '../types'

export class ModerationController {
  private moderationService: ContentModerationService

  constructor(config: ModerationConfig, licenseSecretKey: string) {
    const licenseService = new LicenseService(licenseSecretKey)
    this.moderationService = new ContentModerationService(
      config,
      licenseService,
    )
  }

  moderateContent = async (req: Request, res: Response) => {
    const { licenseKey, content } = req.body

    if (!licenseKey || !content) {
      return res.status(400).json({ error: 'Missing required parameters' })
    }

    try {
      const result = await this.moderationService.moderateContent(
        licenseKey,
        content,
      )
      res.json(result)
    } catch (error) {
      console.error('Error in content moderation:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}
