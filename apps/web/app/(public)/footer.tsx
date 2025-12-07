import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { Logo } from '@shotly/ui/components/logo';

async function Footer() {
  const t = await getTranslations('landing.footer');

  return (
    <footer className="bg-background border-gray-200 py-12 mt-20 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Logo className="h-10" variant="contrast" />
          <p className="mt-4 text-muted-foreground text-sm max-w-xs">
            {t('description')}
          </p>
          <div className="pt-8 text-left text-sm text-muted-foreground">
            {t('copyright')}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4">{t('company.title')}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="#">{t('company.aboutUs')}</Link>
            </li>
            <li>
              <Link href="#">{t('company.careers')}</Link>
            </li>
            <li>
              <Link href="#">{t('company.privacyPolicy')}</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">{t('support.title')}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="#">{t('support.helpCenter')}</Link>
            </li>
            <li>
              <Link href="#">{t('support.termsOfService')}</Link>
            </li>
            <li>
              <Link href="#">{t('support.contact')}</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
