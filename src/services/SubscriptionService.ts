import Subscription from '../models/Subscription'
import { LicenseService, LicenseType } from './LicenseService'

export class SubscriptionService {
  private licenseService: LicenseService

  constructor(licenseSecretKey: string) {
    this.licenseService = new LicenseService(licenseSecretKey)
  }

  async createSubscription(
    userId: string,
    plan: LicenseType,
    duration: number,
  ): Promise<string> {
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + duration)

    const licenseKey = this.licenseService.generateLicenseKey(
      plan,
      expirationDate,
      userId,
    )

    const subscription = new Subscription({
      userId,
      licenseKey,
      plan,
      status: 'active',
      expiresAt: expirationDate,
    })

    await subscription.save()

    return licenseKey
  }

  async verifySubscription(licenseKey: string): Promise<boolean> {
    const licenseInfo = this.licenseService.verifyLicenseKey(licenseKey)
    if (!licenseInfo) {
      return false
    }

    const subscription = await Subscription.findOne({ licenseKey })
    if (!subscription) {
      return false
    }

    return (
      subscription.status === 'active' && subscription.expiresAt > new Date()
    )
  }

  async revokeSubscription(licenseKey: string): Promise<boolean> {
    const subscription = await Subscription.findOne({ licenseKey })
    if (!subscription) {
      return false
    }

    subscription.status = 'revoked'
    await subscription.save()

    return true
  }
}
