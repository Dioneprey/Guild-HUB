import {
  FileInterceptor,
  MemoryStorageFile,
  UploadedFile,
} from '@blazity/nest-file-fastify'
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common'
import { UploadFileUseCase } from 'src/domain/tabletop/application/use-cases/upload/upload-file'

@Controller('upload')
export class UploadFileController {
  constructor(private uploadFile: UploadFileUseCase) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 1024 * 1024 * 5, // 50MB
      },
    }),
  )
  async handle(
    @UploadedFile() file: MemoryStorageFile,
    @Body('fileName') fileName: string,
  ) {
    const { mimetype, buffer } = file

    const result = await this.uploadFile.execute({
      fileBuffer: buffer,
      fileName,
      fileType: mimetype,
    })

    if (result.isLeft()) {
      const error = result.value

      throw new BadRequestException(error.message)
    }

    const { url, id } = result.value

    return {
      url,
      id,
    }
  }
}
