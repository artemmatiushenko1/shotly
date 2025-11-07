import { Collection } from '@/domain/collection';
import { VisibilityStatus } from '@/domain/common';

export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: '1',
    name: 'Karra Loft',
    visibilityStatus: VisibilityStatus.PUBLIC,
    shootDate: new Date('2023-06-19'),
    categoryId: '1',
    description: 'Canada, Vancouver',
    coverImageUrl: '/auth-banner-2.jpg',
  },
  {
    id: '2',
    name: 'Karra Loft',
    visibilityStatus: VisibilityStatus.PRIVATE,
    shootDate: new Date('2023-06-19'),
    categoryId: '1',
    description: 'Canada, Vancouver',
    coverImageUrl: '/auth-banner-2.jpg',
  },
  {
    id: '3',
    name: 'Karra Loft',
    visibilityStatus: VisibilityStatus.PUBLIC,
    shootDate: new Date('2023-06-19'),
    categoryId: '1',
    description: 'Canada, Vancouver',
    coverImageUrl: '/auth-banner-2.jpg',
  },
  {
    id: '4',
    name: 'Karra Loft',
    visibilityStatus: VisibilityStatus.PRIVATE,
    shootDate: new Date('2023-06-19'),
    categoryId: '1',
    description: 'Canada, Vancouver',
    coverImageUrl: '/auth-banner-2.jpg',
  },
];
