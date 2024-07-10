import { ContentModerationService } from './services/ContentModerationService'
import { LicenseService, LicenseType } from './services/LicenseService'
import { ModerationConfig, ModerationResult, Content } from './types'

export {
  ContentModerationService,
  LicenseService,
  LicenseType,
  ModerationConfig,
  ModerationResult,
  Content,
}

export function initContentModeration(
  config: ModerationConfig,
  licenseKey: string,
) {
  const licenseService = new LicenseService(config.licenseSecretKey)
  const contentModerationService = new ContentModerationService(
    config,
    licenseService,
  )

  return {
    moderateContent: (content: Content) =>
      contentModerationService.moderateContent(licenseKey, content),
  }
}
