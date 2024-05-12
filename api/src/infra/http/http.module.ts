import { Module } from '@nestjs/common'
import { CryptographyModule } from 'src/infra/cryptography/cryptography.module'
import { DatabaseModule } from 'src/infra/database/database.module'
import { AuthModule } from '../auth/auth.module'
import { RegisterAccountController } from './controllers/accounts/register-account.controller'
import { RegisterAccountUseCase } from 'src/domain/tabletop/application/use-cases/accounts/register-account'
import { UpdatePlayerController } from './controllers/player/update-player.controller'
import { UpdatePlayerUseCase } from 'src/domain/tabletop/application/use-cases/player/update-player'
import { CredentialsAuthenticateController } from './controllers/sessions/credentials-authenticate.controller'
import { CredentialsAuthenticateUseCase } from 'src/domain/tabletop/application/use-cases/sessions/credentials-authenticate'

@Module({
  imports: [DatabaseModule, CryptographyModule, AuthModule],
  controllers: [
    RegisterAccountController,
    UpdatePlayerController,
    CredentialsAuthenticateController,
  ],
  providers: [
    RegisterAccountUseCase,
    UpdatePlayerUseCase,
    CredentialsAuthenticateUseCase,
  ],
})
export class HttpModule {}
