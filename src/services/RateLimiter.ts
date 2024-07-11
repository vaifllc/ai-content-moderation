import { RateLimiterMemory } from 'rate-limiter-flexible'

export class RateLimiter {
  private limiter: RateLimiterMemory

  constructor(points: number, duration: number) {
    this.limiter = new RateLimiterMemory({
      points,
      duration,
    })
  }

  async consume(key: string, pointsToConsume: number = 1): Promise<void> {
    try {
      await this.limiter.consume(key, pointsToConsume)
    } catch (error) {
      throw new Error('Rate limit exceeded')
    }
  }
}
