import z from 'zod';

// TODO: use for services
export enum VisibilityStatus {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export const visibilityStatusSchema = z.enum(VisibilityStatus);
