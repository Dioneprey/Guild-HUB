import { Either, left, right } from 'src/core/either'
import { ImageCouldNotBeSentError } from '../@errors/image-could-not-be-send.error'
import { Injectable } from '@nestjs/common'
import { Uploader } from '../../storage/uploader'
import { FileRepository } from '../../repositories/file.repository'
import { File } from 'src/domain/tabletop/enterprise/entities/file'
import { verifyMediaType } from '../../utils/verify-media-format'

export interface UploadFilesAsyncUseCaseRequest {
  fileName: string
  fileType: string
  fileBuffer: Buffer
}

type UploadFilesAsyncUseCaseResponse = Either<
  ImageCouldNotBeSentError,
  {
    url: string
    id: string
  }
>

@Injectable()
export class UploadFilesAsyncUseCase {
  constructor(
    private uploader: Uploader,
    private fileRepository: FileRepository,
  ) {}

  async execute({
    fileName,
    fileType,
    fileBuffer,
  }: UploadFilesAsyncUseCaseRequest): Promise<UploadFilesAsyncUseCaseResponse> {
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
        id: file.id.toString(),
      })
    } catch (error) {
      console.log(error)
      return left(new ImageCouldNotBeSentError())
    }
  }
}
