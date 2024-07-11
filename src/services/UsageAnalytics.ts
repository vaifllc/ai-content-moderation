import axios from 'axios'

export class UsageAnalytics {
  private backendUrl: string

  constructor(backendUrl: string) {
    this.backendUrl = backendUrl
  }

  async trackUsage(licenseKey: string, contentType: string): Promise<void> {
    try {
      await axios.post(`${this.backendUrl}/track-usage`, {
        licenseKey,
        contentType,
      })
    } catch (error) {
      console.error('Failed to track usage:', error)
    }
  }

  async getUsageReport(licenseKey: string): Promise<any> {
    try {
      const response = await axios.get(`${this.backendUrl}/usage-report`, {
        params: { licenseKey },
      })
      return response.data
    } catch (error) {
      console.error('Failed to get usage report:', error)
      throw error
    }
  }
}
