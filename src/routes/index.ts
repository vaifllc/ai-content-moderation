// src/routes/index.ts

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
  backendUrl: process.env.BACKEND_URL as string,
  rateLimitPoints: parseInt(process.env.RATE_LIMIT_POINTS || '100', 10),
  rateLimitDuration: parseInt(process.env.RATE_LIMIT_DURATION || '60', 10),
  cacheTTL: parseInt(process.env.CACHE_TTL || '3600', 10),
}

const moderationController = new ModerationController(moderationConfig)
const licenseController = new LicenseController(
  process.env.LICENSE_SECRET_KEY as string,
  process.env.BACKEND_URL as string,
)

// Moderation routes
router.post('/moderate', moderationController.moderateContent)
router.post('/webhook', moderationController.setWebhookUrl)

// License routes
router.post('/license', licenseController.generateLicense)
router.post('/license/verify', licenseController.verifyLicense)
router.post('/license/revoke', licenseController.revokeLicense)
router.get('/license/usage', licenseController.getUsageReport)

export default router
