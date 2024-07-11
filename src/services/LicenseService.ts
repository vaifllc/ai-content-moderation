// src/services/LicenseService.ts

import jwt from 'jsonwebtoken'
import axios from 'axios'
import { LicenseType, LicensePayload } from '../types'

export class LicenseService {
  private secretKey: string
  private backendUrl: string

  constructor(secretKey: string, backendUrl: string) {
    this.secretKey = secretKey
    this.backendUrl = backendUrl
  }

  async verifyLicenseKey(licenseKey: string): Promise<LicensePayload | null> {
    try {
      const decoded = jwt.verify(licenseKey, this.secretKey) as LicensePayload
      const now = Date.now()
      if (decoded.expiresAt > now) {
        // Perform real-time check against the backend
        const response = await axios.post(`${this.backendUrl}/verify-license`, {
          licenseKey,
        })
        if (response.data.valid) {
          return decoded
        }
      }
    } catch (error) {
      console.error('Error verifying license key:', error)
    }
    return null
  }

  generateLicenseKey(
    type: LicenseType,
    expirationDate: Date,
    userId: string,
  ): string {
    const payload: LicensePayload = {
      type,
      limit: this.getLimitForType(type),
      expiresAt: expirationDate.getTime(),
      userId,
    }

    return jwt.sign(payload, this.secretKey, { expiresIn: '1y' })
  }

  private getLimitForType(type: LicenseType): number {
    switch (type) {
      case LicenseType.INDIVIDUAL:
        return 10000
      case LicenseType.SMALL_BUSINESS:
        return 50000
      case LicenseType.ENTERPRISE:
        return Infinity
      case LicenseType.PAY_AS_YOU_GO:
        return Infinity
      default:
        return 0
    }
  }
}
export { LicenseType }
