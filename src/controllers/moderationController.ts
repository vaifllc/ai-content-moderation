// src/controllers/moderationController.ts

import { Request, Response } from 'express'
import { ContentModerationService } from '../services/ContentModerationService'
import { LicenseService } from '../services/LicenseService'
import { ModerationConfig } from '../types'

export class ModerationController {
  private moderationService: ContentModerationService

  constructor(config: ModerationConfig) {
    const licenseService = new LicenseService(
      config.licenseSecretKey,
      config.backendUrl,
    )
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
    } catch (error: any) {
      console.error('Error in content moderation:', error)
      if (error.message === 'Invalid or expired license key') {
        res.status(403).json({ error: 'Invalid or expired license key' })
      } else if (error.message === 'Rate limit exceeded') {
        res.status(429).json({ error: 'Rate limit exceeded' })
      } else {
        res.status(500).json({ error: 'Internal server error' })
      }
    }
  }

  setWebhookUrl = async (req: Request, res: Response) => {
    const { webhookUrl } = req.body
    if (!webhookUrl) {
      return res.status(400).json({ error: 'Webhook URL is required' })
    }

    try {
      this.moderationService.setWebhookUrl(webhookUrl)
      res.json({ message: 'Webhook URL set successfully' })
    } catch (error) {
      console.error('Error setting webhook URL:', error)
      res.status(500).json({ error: 'Failed to set webhook URL' })
    }
  }
}
