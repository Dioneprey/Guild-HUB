import { OnQueueCompleted, Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'
import { UploadFilesAsyncUseCase } from 'src/domain/tabletop/application/use-cases/upload/upload-files-async'
import { UploadGateway } from 'src/infra/events/websocket/gateways/upload.gateway'

export const FILES_UPLOAD_QUEUE = 'invalidate-codes-processor'

@Processor(FILES_UPLOAD_QUEUE)
export class FilesUploadProcessor {
  constructor(
    private uploadFilesAsyncUseCase: UploadFilesAsyncUseCase,
    private uploadGateway: UploadGateway,
  ) {}

  @Process('upload-files')
  async handleFileUpload({ data: { userId, fileName, fileType, fileBuffer } }) {
    console.log('Fila iniciada - upload-file')

    const result = await this.uploadFilesAsyncUseCase.execute({
      fileName,
      fileType,
      fileBuffer: Buffer.from(fileBuffer, 'base64'),
    })

    if (result.isLeft()) {
      const error = result.value

      return error
    }

    const { id, url } = result.value

    return {
      userId,
      url,
      id,
    }
  }

  @OnQueueCompleted()
  onCompleted(
    job: Job,
    {
      id,
      url,
      userId,
    }: {
      userId: string
      url: string
      id: string
    },
  ) {
    console.log(`Job completed with result ${job.name} ${url}`)

    this.uploadGateway.handleEvent({
      userId,
      url,
      id,
    })
  }
}
