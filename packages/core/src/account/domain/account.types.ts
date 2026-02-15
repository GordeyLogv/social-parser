export enum AccountPlatformEnum {
  TIKTOK = 'tiktok',
  INSTAGRAM = 'instagram',
  YOUTUBE = 'youtube',
}

export enum AccountSyncedStatusEnum {
  IDLE = 'idle',
  RUNNING = 'running',
  FAILED = 'failed',
}

export interface IAccountProps {
  accountId?: string;
  telegramId: number;
  platform: AccountPlatformEnum;

  handle: string;
  externalId?: string;
  profileDisplayName?: string;

  syncedStatus?: AccountSyncedStatusEnum;
  lastSyncedAt?: Date;
}
