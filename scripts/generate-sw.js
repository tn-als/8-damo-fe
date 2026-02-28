import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

dotenv.config()

// __dirname 대체 (ESM에서는 기본 제공 안됨)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 템플릿 파일 경로
const templatePath = path.resolve(
  __dirname,
  '../public/firebase-messaging-sw.template.js'
)

const outputPath = path.resolve(
  __dirname,
  '../public/firebase-messaging-sw.js'
)

// 템플릿 읽기
const template = fs.readFileSync(templatePath, 'utf8')

// 환경변수 치환
const output = template
  .replace('__API_KEY__', process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '')
  .replace('__AUTH_DOMAIN__', process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '')
  .replace('__PROJECT_ID__', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? '')
  .replace('__STORAGE_BUCKET__', process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '')
  .replace(
    '__MESSAGING_SENDER_ID__',
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? ''
  )
  .replace(
    '__APP_ID__',
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ??
      process.env.NEXT_PUBLIC_FIREBASE_APPID ??
      ''
  )

// 파일 생성
fs.writeFileSync(outputPath, output)

console.log('✅ firebase-messaging-sw.js 생성 완료')
