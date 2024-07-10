import { initContentModeration, ModerationConfig } from '../src'

async function main() {
  const moderationConfig: ModerationConfig = {
    aiProviders: {
      textAI: 'https://your-text-ai-endpoint.com',
      imageAI: 'https://your-image-ai-endpoint.com',
      videoAI: 'https://your-video-ai-endpoint.com',
    },
    licenseSecretKey: 'your-license-secret-key',
  }

  const licenseKey = 'your-license-key'

  const moderationService = initContentModeration(moderationConfig, licenseKey)

  // Moderate content
  const moderationResult = await moderationService.moderateContent({
    type: 'text',
    data: 'This is a sample text to moderate.',
  })

  console.log('Moderation Result:', moderationResult)
}

main().catch(console.error)
