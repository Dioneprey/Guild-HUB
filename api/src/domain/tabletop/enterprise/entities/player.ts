import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Optional } from 'src/core/types/optional'

// M = “Masculino” | F = “Feminino” | O = “outros"
export enum GenderOptions {
  MAN = 'M',
  WOMAN = 'F',
  OTHER = 'O',
}

export interface PlayerProps {
  name?: string | null
  nickname?: string | null
  bio?: string | null
  gender?: GenderOptions | null
  email: string
  password?: string | null
  avatarUrl?: string | null
  cityId?: string | null
  countryId?: string | null
  birthdate?: Date | null
  createdAt: Date
  updatedAt?: Date | null
}

export class Player extends Entity<PlayerProps> {
  get name() {
    return this.props.name
  }

  set name(name: string | undefined | null) {
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

  get avatarUrl() {
    return this.props.avatarUrl
  }

  set avatarUrl(avatarUrl: string | undefined | null) {
    this.props.avatarUrl = avatarUrl
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
    props: Optional<PlayerProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const player = new Player(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )

    return player
  }
}