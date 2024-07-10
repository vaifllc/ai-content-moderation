import { Request, Response } from 'express'
import { LicenseService, LicenseType } from '../services/LicenseService'

export class LicenseController {
  private licenseService: LicenseService

  constructor(licenseSecretKey: string) {
    this.licenseService = new LicenseService(licenseSecretKey)
  }

  generateLicense = async (req: Request, res: Response) => {
    const { userId, licenseType, duration } = req.body

    if (!userId || !licenseType || !duration) {
      return res.status(400).json({ error: 'Missing required parameters' })
    }

    try {
      const expirationDate = new Date()
      expirationDate.setDate(expirationDate.getDate() + duration)

      const licenseKey = this.licenseService.generateLicenseKey(
        licenseType as LicenseType,
        expirationDate,
        userId,
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
      const licenseInfo = this.licenseService.verifyLicenseKey(licenseKey)

      if (licenseInfo) {
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
      // Implement logic to revoke the license
      // This might involve updating a database to mark the license as revoked
      console.log(`Revoking license: ${licenseKey}`)

      res.json({ message: 'License revoked successfully' })
    } catch (error) {
      console.error('Error revoking license:', error)
      res.status(500).json({ error: 'Failed to revoke license' })
    }
  }
}
