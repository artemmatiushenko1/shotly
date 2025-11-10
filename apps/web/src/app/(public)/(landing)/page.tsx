import { Search } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import LandingSearchBar from './landing-search-bar';
import PhotographerAvatars from './photographer-avatars';
import categoriesRepository from '@/repositories/categories.repository';
import Navigation from './navigation';

async function LandingPage() {
  const categories = await categoriesRepository.getCategories();

  const t = await getTranslations('landing');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden bg-[linear-gradient(to_bottom,_#e8ebff_0%,_#fff4ea_100%)]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-purple-100/30 via-orange-100/20 to-yellow-100/30 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full border-2 border-purple-300/40" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full border-2 border-purple-300/30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border-2 border-purple-300/20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border-2 border-purple-300/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border-2 border-purple-200/10" />
        </div>
        <div className="hidden md:block">
          <PhotographerAvatars />
        </div>
      </div>
      <Navigation />
      <section className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight px-4">
            {t('hero.title')}{' '}
            <span className="">{t('hero.titleHighlight')}</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto px-4">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>
      <section className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <div className="p-2 bg-primary/10 flex-shrink-0 rounded-full">
                <Search className="size-5 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                {t('search.title')}
              </h2>
            </div>
            <p className="text-gray-600 mb-8 text-sm sm:text-base">
              {t('search.description')}
            </p>
            <LandingSearchBar categories={categories} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
