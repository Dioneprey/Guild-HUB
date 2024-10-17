import { Module } from '@nestjs/common'
import { Encrypter } from 'src/domain/core/application/cryptography/encrypter'
import { JwtEncrypter } from './jwt-encrypter'
import { HashComparer } from 'src/domain/core/application/cryptography/hash-comparer'
import { BcryptHasher } from './bcrypt.hasher'
import { HashGenerator } from 'src/domain/core/application/cryptography/hash-generator'

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
  ],
  exports: [Encrypter, HashComparer, HashGenerator],
})
export class CryptographyModule {}
