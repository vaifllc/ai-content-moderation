import axios from 'axios'

export class WebhookNotifier {
  private webhookUrl: string

  constructor(webhookUrl: string) {
    this.webhookUrl = webhookUrl
  }

  async notify(event: string, data: any): Promise<void> {
    try {
      await axios.post(this.webhookUrl, { event, data })
    } catch (error) {
      console.error('Failed to send webhook notification:', error)
    }
  }
}
