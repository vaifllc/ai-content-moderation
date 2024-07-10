# AI Content Moderation System - API Documentation

## Overview

This document provides a detailed explanation of all components, methods, and types used in the AI Content Moderation System package.

## ContentModerationService

The main service for content moderation.

### Methods

- `moderateContent(licenseKey: string, content: Content): Promise<ModerationResult>`
  - Moderates the given content using the specified license key.
  - Throws an error if the license is invalid or expired.

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
```

## LicenseService

Handles license key generation and verification.

### Methods

- `generateLicenseKey(type: LicenseType, expirationDate: Date, userId: string): string`
  - Generates a new license key.
- `verifyLicenseKey(licenseKey: string): LicensePayload | null`
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

## Configuration

The system requires the following configuration:

```typescript
interface ModerationConfig {
  aiProviders: {
    textAI: string
    imageAI: string
    videoAI: string
  }
  licenseSecretKey: string
}
```

## Usage

To use the content moderation system:

1. Initialize the system with the configuration and license key.
2. Use the `moderateContent` method to moderate content.

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
}

const licenseKey = 'your-license-key'
const moderationService = initContentModeration(config, licenseKey)

const result = await moderationService.moderateContent({
  type: 'text',
  data: 'Content to moderate',
})
```

For more detailed information about each component and its methods, please refer to the inline comments in the source code.
