import { AccountHandleVO, AccountPlatformVO } from './value-objects';

export interface IAccountProps {
  id?: number;
  userId: bigint;
  platform: AccountPlatformVO;
  handle: AccountHandleVO;
  url: string;
  syncedStatus: AccountSyncedStatusEnum;
  lastSyncedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAccountPropsFactory {
  userId: bigint;
  platform: string;
  handle: string;
  url: string;
  syncedStatus: AccountSyncedStatusEnum;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAccountToPrimitives {
  id?: number;
  userId: bigint;
  platform: string;
  handle: string;
  url: string;
  syncedStatus: string;
  lastSyncedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum AccountPlatformsEnum {
  TIKTOK = 'tiktok',
  INSTAGRAM = 'instagram',
  YOUTUBE = 'youtube',
}

export enum AccountSyncedStatusEnum {
  IDLE = 'idle',
  RUNNING = 'running',
  FAILED = 'failed',
}
