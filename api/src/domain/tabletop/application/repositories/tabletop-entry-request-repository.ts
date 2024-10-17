import { TabletopEntryRequest } from '../../enterprise/entities/tabletop/tabletop-entry-request'

export interface TabletopEntryRequestRepositoryFindByUniqueFieldProps {
  key: 'tabletopId' | 'playerId'
  value: string
}

export interface TabletopEntryRequestRepositoryFindInTabletopByPlayerIdProps {
  playerId: string
  tabletopId: string
}

export abstract class TabletopEntryRequestRepository {
  abstract findById(requestId: string): Promise<TabletopEntryRequest | null>
  abstract findInTabletopByPlayerId({
    playerId,
    tabletopId,
  }: TabletopEntryRequestRepositoryFindInTabletopByPlayerIdProps): Promise<TabletopEntryRequest | null>

  abstract findManyByUniqueField({
    key,
    value,
  }: TabletopEntryRequestRepositoryFindByUniqueFieldProps): Promise<TabletopEntryRequest | null>

  abstract create(tabletopentryrequest: TabletopEntryRequest): Promise<void>
  abstract save(tabletopentryrequest: TabletopEntryRequest): Promise<void>
  abstract delete(tabletopentryrequest: TabletopEntryRequest): Promise<void>
}
