import { Processor, Process, OnQueueCompleted } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'
import { TokenRepository } from 'src/domain/core/application/repositories/token-repository'

export const INVALIDATE_TOKEN_QUEUE = 'invalidate-token-processor'
@Processor(INVALIDATE_TOKEN_QUEUE)
export class InvalidateTokenProcessor {
  constructor(private tokenRepository: TokenRepository) {}

  @Process('invalidate-token')
  async invalidateMagicLink({ data: tokenId }: Job<string>) {
    console.log(`Fila iniciada - ${INVALIDATE_TOKEN_QUEUE}`)

    const tokenExists = await this.tokenRepository.findById(tokenId)

    if (!tokenExists) return

    await this.tokenRepository.delete(tokenExists)
  }

  @OnQueueCompleted({
    name: 'invalidate-token',
  })
  onCompleted(job: Job<unknown>) {
    Logger.log(`Job ${job.id} has been finished`)
  }
}
