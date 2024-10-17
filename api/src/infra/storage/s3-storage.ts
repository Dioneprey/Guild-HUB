import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { randomUUID } from 'crypto'
import { Injectable } from '@nestjs/common'
import { EnvService } from '../env/env.service'
import {
  UploadParams,
  Uploader,
} from 'src/domain/core/application/storage/uploader'
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { extname, join } from 'path'

import { fromBuffer } from 'file-type'
import * as sharp from 'sharp'

@Injectable()
export class S3Storage implements Uploader {
  private client: S3Client
  private bucketEndPoint: string

  constructor(private envService: EnvService) {
    this.bucketEndPoint = envService.get('AWS_BUCKET_ENDPOINT')

    this.client = new S3Client({
      endpoint: this.bucketEndPoint,
      region: 'sa-east-1',
      credentials: {
        accessKeyId: envService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: envService.get('AWS_SECRET_ACCESS_KEY_ID'),
      },
      forcePathStyle: true,
    })
  }

  async upload({ fileName, fileType, file }: UploadParams) {
    if (!fileType) {
      fileType = await this.checkFileType(file)
    }

    // Se buffer for imagem com mais de 2mb, comprime
    if (fileType.startsWith('image/') && file.length > 200000) {
      file = await sharp(file).jpeg({ quality: 80 }).toBuffer()
    } else if (fileType.startsWith('video/')) {
      // TODO Comprimir video
    }

    if (this.envService.get('NODE_ENV') !== 'production') {
      const uploadPath = join(process.cwd(), 'temp-uploads')

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath)
      }

      let extension = extname(fileName ?? '')

      if (!extension && fileType) {
        extension = `.${fileType.split('/')[1]}`
      }

      const uploadKey = randomUUID()

      const newFileName = `${fileName}-${uploadKey}${extension}`

      writeFileSync(join(uploadPath, newFileName), file)
      return { url: join(uploadPath, newFileName), key: uploadKey }
    }

    const uploadKey = randomUUID()
    const uniqueFileName = `${uploadKey}-${fileName}`

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.envService.get('AWS_BUCKET_NAME'),
        Key: uniqueFileName,
        ContentType: fileType,
        Body: file,
      }),
    )

    const bucketEndPoint = new URL(this.bucketEndPoint)
    const filePath = `/prazer-oculto/${uniqueFileName}`

    const url = new URL(filePath, bucketEndPoint).href

    return {
      url,
      key: uploadKey,
    }
  }

  async checkFileType(buffer) {
    const type = await fromBuffer(buffer)

    if (type) {
      if (type.mime.startsWith('image/')) {
        return 'image/'
      } else if (type.mime.startsWith('video/')) {
        return 'video/'
      } else {
        return 'other'
      }
    } else {
      console.log('Não foi possível determinar o tipo de arquivo')
      return 'other'
    }
  }
}
