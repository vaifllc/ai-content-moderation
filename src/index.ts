//src/index.ts

import { ContentModerationService } from './services/ContentModerationService'
import { LicenseService, LicenseType } from './services/LicenseService'
import { ModerationConfig, ModerationResult, Content } from './types'
import { RateLimiter } from './services/RateLimiter'
import { ContentCache } from './services/ContentCache'
import { WebhookNotifier } from './services/WebhookNotifier'
import { UsageAnalytics } from './services/UsageAnalytics'

export {
  ContentModerationService,
  LicenseService,
  LicenseType,
  ModerationConfig,
  ModerationResult,
  Content,
  RateLimiter,
  ContentCache,
  WebhookNotifier,
  UsageAnalytics,
}

export function initContentModeration(
  config: ModerationConfig,
  licenseKey: string,
) {
  const licenseService = new LicenseService(
    config.licenseSecretKey,
    config.backendUrl,
  )
  const contentModerationService = new ContentModerationService(
    config,
    licenseService,
  )

  return {
    moderateContent: (content: Content) =>
      contentModerationService.moderateContent(licenseKey, content),
    setWebhookUrl: (url: string) => contentModerationService.setWebhookUrl(url),
    getUsageReport: () => contentModerationService.getUsageReport(licenseKey),
  }
}
