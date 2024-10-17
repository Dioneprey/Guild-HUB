import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Optional } from 'src/core/types/optional'
import { File } from '../file'
import { Language } from '../language'

export enum GenderOptions {
  MALE = 'MALE',
  WOMAN = 'WOMAN',
  OTHER = 'OTHER',
}

export enum RoleOptions {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface PlayerProps {
  name: string
  nickname?: string | null
  bio?: string | null
  gender?: GenderOptions | null
  email: string
  password?: string | null
  avatarFileId?: string | null
  avatarFile?: File | null
  cityId?: string | null
  countryId?: string | null
  birthdate?: Date | null
  registrationCompletedAt?: Date | null
  registrationValidatedAt?: Date | null
  playerLanguage?: Language[] | null
  role: RoleOptions
  createdAt: Date
  updatedAt?: Date | null
}

export class Player extends Entity<PlayerProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get nickname() {
    return this.props.nickname
  }

  set nickname(nickname: string | undefined | null) {
    this.props.nickname = nickname
    this.touch()
  }

  get bio() {
    return this.props.bio
  }

  set bio(bio: string | undefined | null) {
    this.props.bio = bio
    this.touch()
  }

  get gender() {
    return this.props.gender
  }

  set gender(gender: GenderOptions | undefined | null) {
    this.props.gender = gender
    this.touch()
  }

  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
    this.touch()
  }

  get password() {
    return this.props.password
  }

  set password(password: string | undefined | null) {
    this.props.password = password
    this.touch()
  }

  get avatarFileId() {
    return this.props.avatarFileId
  }

  set avatarFileId(avatarFileId: string | undefined | null) {
    this.props.avatarFileId = avatarFileId
    this.touch()
  }

  get avatarFile() {
    return this.props.avatarFile
  }

  set avatarFile(avatarFile: File | null | undefined) {
    this.props.avatarFile = avatarFile
    this.touch()
  }

  get cityId() {
    return this.props.cityId
  }

  set cityId(cityId: string | undefined | null) {
    this.props.cityId = cityId
    this.touch()
  }

  get countryId() {
    return this.props.countryId
  }

  set countryId(countryId: string | undefined | null) {
    this.props.countryId = countryId
    this.touch()
  }

  get birthdate() {
    return this.props.birthdate
  }

  set birthdate(birthdate: Date | undefined | null) {
    this.props.birthdate = birthdate
    this.touch()
  }

  get registrationCompletedAt() {
    return this.props.registrationCompletedAt
  }

  set registrationCompletedAt(
    registrationCompletedAt: Date | undefined | null,
  ) {
    this.props.registrationCompletedAt = registrationCompletedAt
    this.touch()
  }

  get registrationValidatedAt() {
    return this.props.registrationValidatedAt
  }

  set registrationValidatedAt(
    registrationValidatedAt: Date | undefined | null,
  ) {
    this.props.registrationValidatedAt = registrationValidatedAt
    this.touch()
  }

  get playerLanguage() {
    return this.props.playerLanguage
  }

  set playerLanguage(playerLanguage: Language[] | undefined | null) {
    this.props.playerLanguage = playerLanguage
    this.touch()
  }

  get role() {
    return this.props.role
  }

  set role(role: RoleOptions) {
    this.props.role = role
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<PlayerProps, 'createdAt' | 'role'>,
    id?: UniqueEntityID,
  ) {
    const player = new Player(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        role: props.role ?? RoleOptions.USER,
      },
      id,
    )

    return player
  }
}
