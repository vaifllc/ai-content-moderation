import express from 'express'
import { ModerationController } from '../controllers/moderationController'
import { LicenseController } from '../controllers/LicenseController.ts'
import { ModerationConfig } from '../types'

const router = express.Router()

// Initialize controllers
const moderationConfig: ModerationConfig = {
  aiProviders: {
    textAI: process.env.TEXT_AI_ENDPOINT as string,
    imageAI: process.env.IMAGE_AI_ENDPOINT as string,
    videoAI: process.env.VIDEO_AI_ENDPOINT as string,
  },
  licenseSecretKey: process.env.LICENSE_SECRET_KEY as string,
}

const moderationController = new ModerationController(
  moderationConfig,
  process.env.LICENSE_SECRET_KEY as string,
)

const licenseController = new LicenseController(
  process.env.LICENSE_SECRET_KEY as string,
)

// Moderation routes
router.post('/moderate', moderationController.moderateContent)

// License routes
router.post('/license', licenseController.generateLicense)
router.post('/license/verify', licenseController.verifyLicense)
router.post('/license/revoke', licenseController.revokeLicense)

export default router
