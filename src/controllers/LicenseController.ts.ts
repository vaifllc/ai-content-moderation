// src/controllers/LicenseController.ts

import { Request, Response } from 'express'
import { LicenseService, LicenseType } from '../services/LicenseService'
import { SubscriptionService } from '../services/SubscriptionService'

export class LicenseController {
  private licenseService: LicenseService
  private subscriptionService: SubscriptionService

  constructor(licenseSecretKey: string, backendUrl: string) {
    this.licenseService = new LicenseService(licenseSecretKey, backendUrl)
    this.subscriptionService = new SubscriptionService(
      licenseSecretKey,
      backendUrl,
    )
  }

  generateLicense = async (req: Request, res: Response) => {
    const { userId, licenseType, duration } = req.body
    if (!userId || !licenseType || !duration) {
      return res.status(400).json({ error: 'Missing required parameters' })
    }

    try {
      const licenseKey = await this.subscriptionService.createSubscription(
        userId,
        licenseType as LicenseType,
        duration,
      )
      res.json({ licenseKey })
    } catch (error) {
      console.error('Error generating license:', error)
      res.status(500).json({ error: 'Failed to generate license' })
    }
  }

  verifyLicense = async (req: Request, res: Response) => {
    const { licenseKey } = req.body
    if (!licenseKey) {
      return res.status(400).json({ error: 'License key is required' })
    }

    try {
      const isValid = await this.subscriptionService.verifySubscription(
        licenseKey,
      )
      if (isValid) {
        const licenseInfo = await this.licenseService.verifyLicenseKey(
          licenseKey,
        )
        res.json({ valid: true, licenseInfo })
      } else {
        res.json({ valid: false })
      }
    } catch (error) {
      console.error('Error verifying license:', error)
      res.status(500).json({ error: 'Failed to verify license' })
    }
  }

  revokeLicense = async (req: Request, res: Response) => {
    const { licenseKey } = req.body
    if (!licenseKey) {
      return res.status(400).json({ error: 'License key is required' })
    }

    try {
      const revoked = await this.subscriptionService.revokeSubscription(
        licenseKey,
      )
      if (revoked) {
        res.json({ message: 'License revoked successfully' })
      } else {
        res.status(404).json({ error: 'License not found or already revoked' })
      }
    } catch (error) {
      console.error('Error revoking license:', error)
      res.status(500).json({ error: 'Failed to revoke license' })
    }
  }

  getUsageReport = async (req: Request, res: Response) => {
    const { licenseKey } = req.query
    if (!licenseKey) {
      return res.status(400).json({ error: 'License key is required' })
    }

    try {
      const report = await this.subscriptionService.getUsageReport(
        licenseKey as string,
      )
      res.json(report)
    } catch (error) {
      console.error('Error getting usage report:', error)
      res.status(500).json({ error: 'Failed to get usage report' })
    }
  }
}
