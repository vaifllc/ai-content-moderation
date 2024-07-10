import jwt from 'jsonwebtoken'

export enum LicenseType {
  INDIVIDUAL = 'individual',
  SMALL_BUSINESS = 'small_business',
  ENTERPRISE = 'enterprise',
  PAY_AS_YOU_GO = 'pay_as_you_go',
}

export interface LicensePayload {
  type: LicenseType
  limit: number
  expiresAt: number
  userId: string
}

export class LicenseService {
  private secretKey: string

  constructor(secretKey: string) {
    this.secretKey = secretKey
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

  verifyLicenseKey(licenseKey: string): LicensePayload | null {
    try {
      const decoded = jwt.verify(licenseKey, this.secretKey) as LicensePayload
      const now = Date.now()
      if (decoded.expiresAt > now) {
        return decoded
      }
    } catch (error) {
      console.error('Error verifying license key:', error)
    }
    return null
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
