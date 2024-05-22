import {
  FilesInterceptor,
  MemoryStorageFile,
  UploadedFiles,
} from '@blazity/nest-file-fastify'
import { InjectQueue } from '@nestjs/bull'
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common'
import { Queue } from 'bull'
import { CurrentUser } from 'src/infra/auth/current-user.decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'
import { FILES_UPLOAD_QUEUE } from 'src/infra/schedules/bull/processor/upload-files.processor'

@Controller('upload/async')
export class UploadFilesAsyncController {
  constructor(
    @InjectQueue(FILES_UPLOAD_QUEUE) private fileUploadQueue: Queue,
  ) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      limits: {
        fileSize: 1024 * 1024 * 50, // 50MB
      },
    }),
  )
  async handle(
    @UploadedFiles() files: MemoryStorageFile[],
    @CurrentUser() user: UserPayload,
    @Body('fileName') fileName: string,
  ) {
    const userId = user.sub

    if (!files || !Array.isArray(files)) {
      return new BadRequestException('Não foram enviados arquivos')
    }

    files.forEach((file) => {
      const { mimetype, buffer } = file

      this.fileUploadQueue.add('upload-files', {
        fileName,
        fileType: mimetype,
        fileBuffer: buffer.toString('base64'),
        userId,
      })
    })
    return { message: 'Files are being uploaded.' }
  }
}
