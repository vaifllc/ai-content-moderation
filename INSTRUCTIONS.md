# AI Content Moderation System - Usage Instructions

This document provides detailed instructions on how to integrate and use the AI Content Moderation System in your applications.

## Prerequisites

- Node.js (v14 or later)
- An active license key for the AI Content Moderation System

## Installation

1. Install the package using npm:

   ```
   npm install ai-content-moderation
   ```

2. Set up environment variables:
   Create a `.env` file in your project root and add the following variables:
   ```
   TEXT_AI_ENDPOINT=your-text-ai-endpoint
   IMAGE_AI_ENDPOINT=your-image-ai-endpoint
   VIDEO_AI_ENDPOINT=your-video-ai-endpoint
   LICENSE_SECRET_KEY=your-license-secret-key
   BACKEND_URL=your-backend-url
   RATE_LIMIT_POINTS=100
   RATE_LIMIT_DURATION=60
   CACHE_TTL=3600
   ```

## Usage

1. Import and initialize the content moderation system:

   ```typescript
   import {
     initContentModeration,
     ModerationConfig,
   } from 'ai-content-moderation'

   const config: ModerationConfig = {
     aiProviders: {
       textAI: process.env.TEXT_AI_ENDPOINT,
       imageAI: process.env.IMAGE_AI_ENDPOINT,
       videoAI: process.env.VIDEO_AI_ENDPOINT,
     },
     licenseSecretKey: process.env.LICENSE_SECRET_KEY,
     backendUrl: process.env.BACKEND_URL,
     rateLimitPoints: parseInt(process.env.RATE_LIMIT_POINTS || '100', 10),
     rateLimitDuration: parseInt(process.env.RATE_LIMIT_DURATION || '60', 10),
     cacheTTL: parseInt(process.env.CACHE_TTL || '3600', 10),
   }

   const licenseKey = 'your-license-key'
   const moderationService = initContentModeration(config, licenseKey)
   ```

2. Use the moderation service to moderate content:

   ```typescript
   const result = await moderationService.moderateContent({
     type: 'text',
     data: 'Content to moderate',
   })

   if (result.isApproved) {
     console.log('Content approved')
   } else {
     console.log('Content flagged:', result.flaggedContent)
   }
   ```

3. Set up webhook notifications:

   ```typescript
   moderationService.setWebhookUrl('https://your-webhook-url.com')
   ```

4. Get usage reports:
   ```typescript
   const usageReport = await moderationService.getUsageReport()
   console.log('Usage Report:', usageReport)
   ```

## License Types

The system supports four license types:

1. Individual
2. Small Business
3. Enterprise
4. Pay-as-you-go

Each license type has different usage limits and features. Make sure to use the appropriate license key for your use case.

## Error Handling

The system may throw errors in the following cases:

- Invalid or expired license key
- Exceeded usage limit
- Failed content moderation (e.g., API errors)
- Rate limit exceeded

Always wrap your moderation calls in try-catch blocks to handle these errors gracefully.

## Best Practices

1. Store your license key securely and never expose it in client-side code.
2. Monitor your usage to ensure you don't exceed your license limits.
3. Implement proper error handling to manage moderation failures, rate limiting, or license issues.
4. Use webhook notifications for real-time updates on moderation results.
5. Regularly check your usage reports to optimize your content moderation strategy.
6. Utilize caching to improve performance and reduce API calls for frequently moderated content.
7. Regularly update to the latest version of the package to benefit from improvements and bug fixes.

For more detailed API documentation, please refer to the API_DOCUMENTATION.md file.
