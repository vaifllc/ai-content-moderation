# AI Content Moderation System - API Documentation

## Overview

This document provides a detailed explanation of all components, methods, and types used in the AI Content Moderation System package.

## ContentModerationService

The main service for content moderation.

### Methods

- `moderateContent(licenseKey: string, content: Content): Promise<ModerationResult>`

  - Moderates the given content using the specified license key.
  - Throws an error if the license is invalid or expired, or if the rate limit is exceeded.

- `setWebhookUrl(url: string): void`

  - Sets the URL for webhook notifications.

- `getUsageReport(): Promise<any>`
  - Retrieves the usage report for the current license key.

### Types

```typescript
interface Content {
  type: 'text' | 'image' | 'video'
  data: string
}

interface ModerationResult {
  isApproved: boolean
  flaggedContent: string[]
}

interface ModerationConfig {
  aiProviders: {
    textAI: string
    imageAI: string
    videoAI: string
  }
  licenseSecretKey: string
  backendUrl: string
  rateLimitPoints: number
  rateLimitDuration: number
  cacheTTL: number
}
```

## LicenseService

Handles license key generation and verification.

### Methods

- `generateLicenseKey(type: LicenseType, expirationDate: Date, userId: string): string`

  - Generates a new license key.

- `verifyLicenseKey(licenseKey: string): Promise<LicensePayload | null>`
  - Verifies a license key and returns the payload if valid.

### Types

```typescript
enum LicenseType {
  INDIVIDUAL = 'individual',
  SMALL_BUSINESS = 'small_business',
  ENTERPRISE = 'enterprise',
  PAY_AS_YOU_GO = 'pay_as_you_go',
}

interface LicensePayload {
  type: LicenseType
  limit: number
  expiresAt: number
  userId: string
}
```

## SubscriptionService

Manages user subscriptions.

### Methods

- `createSubscription(userId: string, plan: LicenseType, duration: number): Promise<string>`

  - Creates a new subscription and returns the license key.

- `verifySubscription(licenseKey: string): Promise<boolean>`

  - Verifies if a subscription is active.

- `revokeSubscription(licenseKey: string): Promise<boolean>`

  - Revokes a subscription.

- `getUsageReport(licenseKey: string): Promise<any>`
  - Retrieves the usage report for a specific license key.

## RateLimiter

Handles rate limiting for API requests.

### Methods

- `consume(key: string, pointsToConsume: number = 1): Promise<void>`
  - Consumes rate limit points for a given key.
  - Throws an error if the rate limit is exceeded.

## ContentCache

Manages caching of moderation results.

### Methods

- `get(key: string): any`

  - Retrieves a cached result for a given key.

- `set(key: string, value: any): void`
  - Sets a cached result for a given key.

## WebhookNotifier

Handles sending webhook notifications.

### Methods

- `notify(event: string, data: any): Promise<void>`
  - Sends a webhook notification for a given event.

## UsageAnalytics

Tracks and reports usage analytics.

### Methods

- `trackUsage(licenseKey: string, contentType: string): Promise<void>`

  - Tracks usage for a given license key and content type.

- `getUsageReport(licenseKey: string): Promise<any>`
  - Retrieves the usage report for a specific license key.

## Usage

To use the content moderation system:

1. Initialize the system with the configuration and license key.
2. Use the `moderateContent` method to moderate content.
3. Set up webhook notifications if needed.
4. Retrieve usage reports as necessary.

Example:

```typescript
import { initContentModeration, ModerationConfig } from 'ai-content-moderation'

const config: ModerationConfig = {
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
const result = await moderationService.moderateContent({
  type: 'text',
  data: 'Content to moderate',
})

// Set webhook URL
moderationService.setWebhookUrl('https://your-webhook-url.com')

// Get usage report
const usageReport = await moderationService.getUsageReport()
```

For more detailed information about each component and its methods, please refer to the inline comments in the source code.
