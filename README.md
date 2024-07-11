# AI Content Moderation System

## Overview

The AI Content Moderation System is a comprehensive Node.js package that provides content moderation capabilities powered by AI. This system is designed to be easily integrated into existing applications to provide robust content moderation features.

## Key Features

1. **AI-Powered Content Moderation**: Utilizes advanced AI models to moderate text, image, and video content.
2. **License-based Usage**: Uses license keys for access control and usage tracking.
3. **Flexible API**: Provides a simple API for easy integration with various applications.
4. **Multiple License Types**: Supports different license types to accommodate various usage levels.
5. **Rate Limiting**: Prevents API abuse and ensures fair usage.
6. **Caching**: Improves performance and reduces unnecessary AI API calls.
7. **Webhook Notifications**: Allows real-time updates for moderation results.
8. **Usage Analytics**: Helps users track and manage their content moderation usage.

## Installation

```bash
npm install ai-content-moderation
```

## Quick Start

```javascript
import { initContentModeration, ModerationConfig } from 'ai-content-moderation'

const config = {
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
const moderationService = initContentModeration(config, licenseKey)

// Moderate content
moderationService
  .moderateContent({
    type: 'text',
    data: 'Content to moderate',
  })
  .then((result) => console.log(result))
  .catch((error) => console.error(error))

// Set webhook URL
moderationService.setWebhookUrl('https://your-webhook-url.com')

// Get usage report
moderationService.getUsageReport().then(console.log).catch(console.error)
```

## License Types

1. Individual Plan
2. Small Business Plan
3. Enterprise Plan
4. Pay-as-you-go Option

## Documentation

For detailed usage instructions, please refer to the [INSTRUCTIONS.md](./INSTRUCTIONS.md) file.

For API documentation, please see the [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) file.

## Changelog

For a list of changes and version history, please see the [CHANGELOG.md](./CHANGELOG.md) file.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For any questions or support needs, please contact our support team at support@vaif.tech.
