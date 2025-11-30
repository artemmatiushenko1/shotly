import Filters from './filters';
import PhotographerCard from './photographer-card';
import { getTranslations } from 'next-intl/server';

async function SearchPage() {
  const t = await getTranslations('landing.searchPage');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold">{t('title')}</h1>
      <p className="text-sm text-muted-foreground mb-4">{t('description')}</p>
      <Filters />
      <p className="text-lg font-bold mb-4 mt-12">
        {t('resultsCount', { count: 3 })}
      </p>
      <div className="min-h-[300px] grid grid-cols-2 gap-4">
        <PhotographerCard
          id="8tm45VnSY2igu9m4Zj6Z25Xb3rDMhd6t"
          name="Андрій Бойко"
          image="/avatar-1.jpg"
          location="Київ"
          rating={4.5}
          yearsOfExperience={2}
          startingPrice={2000}
          currency="грн"
          categoryName="Портрет"
          portfolioImages={['/portrait-1.jpg', '/portrait-2.jpg']}
        />
        <PhotographerCard
          id="8tm45VnSY2igu9m4Zj6Z25Xb3rDMhd6t"
          name="Марія Шевчук"
          image="/avatar-4.jpg"
          location="Київ"
          rating={4.5}
          yearsOfExperience={5}
          startingPrice={1000}
          currency="грн"
          categoryName="Landscape"
          portfolioImages={['/landscape-1.jpg', '/landscape-2.jpg']}
        />
        <PhotographerCard
          id="8tm45VnSY2igu9m4Zj6Z25Xb3rDMhd6t"
          name="Артем Гаврилюк"
          image="/avatar-3.jpg"
          location="Київ"
          rating={4.5}
          yearsOfExperience={10}
          startingPrice={3000}
          currency="грн"
          categoryName="Комерційна"
          portfolioImages={[
            '/auth-banner-2.jpg',
            '/auth-banner-3.jpg',
            '/auth-banner-4.jpg',
          ]}
        />
      </div>
    </div>
  );
}

export default SearchPage;
