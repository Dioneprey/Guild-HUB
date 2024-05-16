import { Module, forwardRef } from '@nestjs/common'
import { CryptographyModule } from 'src/infra/cryptography/cryptography.module'
import { DatabaseModule } from 'src/infra/database/database.module'
import { AuthModule } from '../auth/auth.module'
import { RegisterAccountController } from './controllers/accounts/register-account.controller'
import { RegisterAccountUseCase } from 'src/domain/tabletop/application/use-cases/accounts/register-account'
import { UpdatePlayerController } from './controllers/player/update-player.controller'
import { UpdatePlayerUseCase } from 'src/domain/tabletop/application/use-cases/player/update-player'
import { CredentialsAuthenticateController } from './controllers/sessions/credentials-authenticate.controller'
import { CredentialsAuthenticateUseCase } from 'src/domain/tabletop/application/use-cases/sessions/credentials-authenticate'
import { SendAccountValidationCodeController } from './controllers/accounts/send-account-validation-code.controller'
import { SendAccountValidationCodeUseCase } from 'src/domain/tabletop/application/use-cases/accounts/send-account-validation-code'
import { ValidateAccountController } from './controllers/accounts/validate-account.controller'
import { ValidateAccountUseCase } from 'src/domain/tabletop/application/use-cases/accounts/validate-account'
import { MailModule } from '../mail/mail.module'
import { BullConfigModule } from '../schedules/bull/bull.module'
import { RegisterTabletopController } from './controllers/tabletop/register-tabletop.controller'
import { RegisterTabletopLocationController } from './controllers/tabletop/register-tabletop-location.controller'
import { RegisterTabletopUseCase } from 'src/domain/tabletop/application/use-cases/tabletop/register-tabletop'
import { RegisterTabletopLocationUseCase } from 'src/domain/tabletop/application/use-cases/tabletop/register-tabletop-location'
import { FetchNearbyTabletopUseCase } from 'src/domain/tabletop/application/use-cases/tabletop/fetch-nearby-tabletop'
import { FetchNearbyTabletopController } from './controllers/tabletop/fetch-nearby-tabletop.controller'

@Module({
  imports: [
    forwardRef(() => BullConfigModule),
    DatabaseModule,
    CryptographyModule,
    AuthModule,
    MailModule,
  ],
  controllers: [
    // Accounts
    RegisterAccountController,
    SendAccountValidationCodeController,
    ValidateAccountController,

    // Sessions
    CredentialsAuthenticateController,

    // Player
    UpdatePlayerController,

    // Tabletop
    RegisterTabletopController,
    RegisterTabletopLocationController,
    FetchNearbyTabletopController,
  ],
  providers: [
    // Accounts
    RegisterAccountUseCase,
    SendAccountValidationCodeUseCase,
    ValidateAccountUseCase,

    // Sessions
    CredentialsAuthenticateUseCase,

    // Player
    UpdatePlayerUseCase,

    // Tabletop
    RegisterTabletopUseCase,
    RegisterTabletopLocationUseCase,
    FetchNearbyTabletopUseCase,
  ],
})
export class HttpModule {}
