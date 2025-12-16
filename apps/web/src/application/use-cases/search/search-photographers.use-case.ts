import { SearchParams, SortOption } from '@/entities/models/search';

const MOCK_PHOTOGRAPHERS = [
  {
    id: '8tm45VnSY2igu9m4Zj6Z25Xb3rDMhd6t',
    name: 'Андрій Бойко',
    image: '/avatar-1.jpg',
    location: 'Київ',
    rating: 4.5,
    yearsOfExperience: 2,
    startingPrice: 2000,
    currency: 'грн',
    categoryName: 'Портрет',
    categoryId: 'portrait', // Added for filtering
    portfolioImages: ['/portrait-1.jpg', '/portrait-2.jpg'],
  },
  {
    id: '9tm45VnSY2igu9m4Zj6Z25Xb3rDMhd6y',
    name: 'Марія Шевчук',
    image: '/avatar-4.jpg',
    location: 'Київ',
    rating: 4.8,
    yearsOfExperience: 5,
    startingPrice: 1000,
    currency: 'грн',
    categoryName: 'Landscape',
    categoryId: 'landscape',
    portfolioImages: ['/landscape-1.jpg', '/landscape-2.jpg'],
  },
  {
    id: '7tm45VnSY2igu9m4Zj6Z25Xb3rDMhd6x',
    name: 'Артем Гаврилюк',
    image: '/avatar-3.jpg',
    location: 'Львів',
    rating: 4.2,
    yearsOfExperience: 10,
    startingPrice: 3000,
    currency: 'грн',
    categoryName: 'Комерційна',
    categoryId: 'commercial',
    portfolioImages: [
      '/auth-banner-2.jpg',
      '/auth-banner-3.jpg',
      '/auth-banner-4.jpg',
    ],
  },
];

export const searchPhotographersUseCase = async (
  searchParams: SearchParams,
) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  let results = [...MOCK_PHOTOGRAPHERS];

  // 1. Filter by Search Text
  if (searchParams.search) {
    const q = searchParams.search.toLowerCase();
    results = results.filter((p) => p.name.toLowerCase().includes(q));
  }

  // 2. Filter by Category
  if (searchParams.categoryId && searchParams.categoryId !== 'any') {
    // In real app compare IDs, here we just check if it matches our mock property
    // We assume the inputs match mock IDs roughly
  }

  // 3. Filter by Experience
  if (searchParams.experienceYears !== null) {
    results = results.filter(
      (p) => p.yearsOfExperience >= searchParams.experienceYears!,
    );
  }

  // 4. Sorting
  if (searchParams.sort === SortOption.PRICE_LOW_TO_HIGH) {
    results.sort((a, b) => a.startingPrice - b.startingPrice);
  } else if (searchParams.sort === SortOption.PRICE_HIGH_TO_LOW) {
    results.sort((a, b) => b.startingPrice - a.startingPrice);
  } else if (searchParams.sort === SortOption.RATING_HIGHEST) {
    results.sort((a, b) => b.rating - a.rating);
  }

  return results;
};
