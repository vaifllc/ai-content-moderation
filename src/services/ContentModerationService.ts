// src/services/ContentModerationService.ts

import axios from 'axios'
import {
  ModerationConfig,
  ModerationResult,
  Content,
  LicensePayload,
} from '../types'
import { LicenseService } from './LicenseService'
import { RateLimiter } from '../services/RateLimiter'
import { ContentCache } from '../services/ContentCache'
import { WebhookNotifier } from '../services/WebhookNotifier'
import { UsageAnalytics } from '../services/UsageAnalytics'

export class ContentModerationService {
  private config: ModerationConfig
  private licenseService: LicenseService
  private rateLimiter: RateLimiter
  private cache: ContentCache
  private webhookNotifier: WebhookNotifier | null = null
  private usageAnalytics: UsageAnalytics

  constructor(config: ModerationConfig, licenseService: LicenseService) {
    this.config = config
    this.licenseService = licenseService
    this.rateLimiter = new RateLimiter(
      config.rateLimitPoints,
      config.rateLimitDuration,
    )
    this.cache = new ContentCache(config.cacheTTL)
    this.usageAnalytics = new UsageAnalytics(config.backendUrl)
  }

  setWebhookUrl(url: string): void {
    this.webhookNotifier = new WebhookNotifier(url)
  }

  async moderateContent(
    licenseKey: string,
    content: Content,
  ): Promise<ModerationResult> {
    const license = await this.licenseService.verifyLicenseKey(licenseKey)
    if (!license) {
      throw new Error('Invalid or expired license key')
    }

    await this.rateLimiter.consume(licenseKey)

    const cacheKey = `${licenseKey}:${content.type}:${content.data}`
    const cachedResult = this.cache.get(cacheKey)
    if (cachedResult) {
      return cachedResult
    }

    let result: ModerationResult
    switch (content.type) {
      case 'text':
        result = await this.moderateText(content.data)
        break
      case 'image':
        result = await this.moderateImage(content.data)
        break
      case 'video':
        result = await this.moderateVideo(content.data)
        break
      default:
        throw new Error(`Unsupported content type: ${content.type}`)
    }

    this.cache.set(cacheKey, result)
    await this.usageAnalytics.trackUsage(licenseKey, content.type)

    if (this.webhookNotifier) {
      await this.webhookNotifier.notify('content_moderated', result)
    }

    return result
  }

  async getUsageReport(licenseKey: string): Promise<any> {
    return this.usageAnalytics.getUsageReport(licenseKey)
  }

  private async moderateText(text: string): Promise<ModerationResult> {
    try {
      const response = await axios.post(this.config.aiProviders.textAI, {
        text,
      })
      return this.processAIResponse(response.data)
    } catch (error) {
      console.error('Error moderating text:', error)
      return { isApproved: false, flaggedContent: ['Error processing text'] }
    }
  }

  private async moderateImage(imageUrl: string): Promise<ModerationResult> {
    try {
      const response = await axios.post(this.config.aiProviders.imageAI, {
        imageUrl,
      })
      return this.processAIResponse(response.data)
    } catch (error) {
      console.error('Error moderating image:', error)
      return { isApproved: false, flaggedContent: ['Error processing image'] }
    }
  }

  private async moderateVideo(videoUrl: string): Promise<ModerationResult> {
    try {
      const response = await axios.post(this.config.aiProviders.videoAI, {
        videoUrl,
      })
      return this.processAIResponse(response.data)
    } catch (error) {
      console.error('Error moderating video:', error)
      return { isApproved: false, flaggedContent: ['Error processing video'] }
    }
  }

  private processAIResponse(aiResponse: any): ModerationResult {
    return {
      isApproved: aiResponse.isApproved,
      flaggedContent: aiResponse.flaggedContent || [],
    }
  }
}
