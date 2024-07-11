// src/config/index.ts

import dotenv from 'dotenv'

dotenv.config()

export default {
  port: process.env.PORT || 3000,
  mongodbUri: process.env.MONGODB_URI as string,
  jwtSecret: process.env.JWT_SECRET as string,
  licenseSecretKey: process.env.LICENSE_SECRET_KEY as string,
  textAIEndpoint: process.env.TEXT_AI_ENDPOINT as string,
  imageAIEndpoint: process.env.IMAGE_AI_ENDPOINT as string,
  videoAIEndpoint: process.env.VIDEO_AI_ENDPOINT as string,
}
