import { Either, left, right } from 'src/core/either'
import { ImageCouldNotBeSentError } from '../@errors/image-could-not-be-send.error'
import { Injectable } from '@nestjs/common'
import { Uploader } from '../../storage/uploader'
import { FileRepository } from '../../repositories/file.repository'
import { File } from 'src/domain/tabletop/enterprise/entities/file'
import { verifyMediaType } from '../../utils/verify-media-format'

interface UploadFileUseCaseRequest {
  fileName: string
  fileType: string
  fileBuffer: Buffer
}

type UploadFileUseCaseResponse = Either<
  ImageCouldNotBeSentError,
  {
    url: string
    key: string
  }
>

@Injectable()
export class UploadFileUseCase {
  constructor(
    private uploader: Uploader,
    private fileRepository: FileRepository,
  ) {}

  async execute({
    fileName,
    fileType,
    fileBuffer,
  }: UploadFileUseCaseRequest): Promise<UploadFileUseCaseResponse> {
    try {
      const { url, key } = await this.uploader.upload({
        fileName,
        fileType,
        file: fileBuffer,
      })

      const file = File.create({
        name: fileName,
        key,
        path: url,
        type: verifyMediaType(fileType),
      })

      await this.fileRepository.create(file)

      return right({
        url,
        key: file.key,
      })
    } catch (error) {
      console.log(error)
      return left(new ImageCouldNotBeSentError())
    }
  }
}
