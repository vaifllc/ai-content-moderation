//examples/basic-usage.ts

import { initContentModeration, ModerationConfig } from '../src'

async function main() {
  const moderationConfig: ModerationConfig = {
    aiProviders: {
      textAI: 'https://your-text-ai-endpoint.com',
      imageAI: 'https://your-image-ai-endpoint.com',
      videoAI: 'https://your-video-ai-endpoint.com',
    },
    licenseSecretKey: 'your-license-secret-key',
    backendUrl: 'https://your-backend-url.com',
    rateLimitPoints: 100,
    rateLimitDuration: 60,
    cacheTTL: 3600,
  }

  const licenseKey = 'your-license-key'
  const moderationService = initContentModeration(moderationConfig, licenseKey)

  // Set webhook URL (optional)
  moderationService.setWebhookUrl('https://your-webhook-url.com')

  // Moderate content
  try {
    const moderationResult = await moderationService.moderateContent({
      type: 'text',
      data: 'This is a sample text to moderate.',
    })
    console.log('Moderation Result:', moderationResult)

    // Get usage report
    const usageReport = await moderationService.getUsageReport()
    console.log('Usage Report:', usageReport)
  } catch (error) {
    console.error('Error:', error)
  }
}

main().catch(console.error)
