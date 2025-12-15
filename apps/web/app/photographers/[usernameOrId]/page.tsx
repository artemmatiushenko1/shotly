import { ArrowUpRightIcon, BookmarkIcon } from 'lucide-react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { getProfileByUsernameOrIdUseCase } from '@/application/use-cases/account';

import { Avatar, AvatarImage } from '@shotly/ui/components/avatar';
import { Button } from '@shotly/ui/components/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@shotly/ui/components/tooltip';

import ProfileTabs from './tabs';

type PhotographerPublicProfileProps = {
  params: Promise<{ usernameOrId: string }>;
};

async function PhotographerPublicProfile({
  params,
}: PhotographerPublicProfileProps) {
  const { usernameOrId } = await params;

  const t = await getTranslations('photographerProfile');

  const profile = await getProfileByUsernameOrIdUseCase(usernameOrId);

  const coverImageUrl = profile.coverImageUrl || '/default-cover.jpg';
  const profileImageUrl = profile.profileImageUrl || undefined;

  return (
    <div>
      <div className="h-70 overflow-hidden relative p-3">
        <div className="rounded-3xl w-full h-full overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/60 z-1" />
          <Image
            alt={t('coverImageAlt')}
            src={coverImageUrl}
            width={1000}
            height={400}
            className="w-full h-full object-cover inline-block"
            style={{ objectPosition: '0 65%' }}
          />
        </div>
      </div>
      <div className="max-w-6xl px-4 m-auto">
        <div className="-translate-y-1/2 flex relative">
          <Avatar className="rounded-full w-40 h-40 border-3 border-white mr-6">
            <AvatarImage src={profileImageUrl} alt={profile.name} />
          </Avatar>
          <div className="pt-25">
            <h1 className="text-2xl font-bold inline-flex items-center gap-2">
              {profile.name}{' '}
              {profile.username && (
                <span className="text-sm font-normal text-muted-foreground">
                  @{profile.username}
                </span>
              )}
            </h1>
            {profile.bio && (
              <p className="text-muted-foreground text-sm mb-3">
                {profile.bio}
              </p>
            )}
          </div>
          <div className="flex items-center pt-20 gap-2 ml-auto">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost">
                  <BookmarkIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{t('bookmark')}</TooltipContent>
            </Tooltip>
            <Button className="rounded-full">{t('bookNow')}</Button>
          </div>
        </div>
        <div className="-mt-13 flex">
          <div className="grid grid-cols-7 gap-12 pb-12">
            <div className="col-span-4 space-y-8">
              <div>
                <h3 className="text-lg font-bold mb-3">{t('aboutMe')}</h3>
                <div className="leading-relaxed space-y-4 text-muted-foreground">
                  <p>{profile.aboutMe}</p>
                </div>
              </div>
            </div>
            <div className="space-y-6 col-span-3">
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-x-9 gap-y-6">
                {profile.websiteUrl && (
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                      {t('website')}
                    </h4>
                    <a
                      href={`${profile.websiteUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 font-medium hover:text-primary transition-colors group"
                    >
                      <span className="truncate">
                        {profile.websiteUrl.replace(/^https?:\/\//, '')}
                      </span>
                      <ArrowUpRightIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0" />
                    </a>
                  </div>
                )}

                {profile.yearsOfExperience && (
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                      {t('experience')}
                    </h4>
                    <span className="font-medium">
                      {t('experienceYears', {
                        years: profile.yearsOfExperience,
                      })}
                    </span>
                  </div>
                )}

                <div className="overflow-hidden">
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                    {t('email')}
                  </h4>
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-2 font-medium hover:text-primary transition-colors group"
                  >
                    <span className="truncate">{profile.email}</span>
                    <ArrowUpRightIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0" />
                  </a>
                </div>

                {/* Social */}
                {profile.instagramTag && (
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                      {t('social')}
                    </h4>
                    <a
                      href={`https://instagram.com/${profile.instagramTag}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 font-medium hover:text-primary transition-colors group"
                    >
                      <span className="truncate">@{profile.instagramTag}</span>
                      <ArrowUpRightIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0" />
                    </a>
                  </div>
                )}

                {/* Location */}
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                    {t('locations')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.locations.map((location) => (
                      <span
                        key={location.externalId}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {location.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                {profile.languages && (
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                      {t('languages')}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.languages.map((lang) => (
                        <span
                          key={lang.code}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {lang.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <ProfileTabs />
      </div>
    </div>
  );
}

export default PhotographerPublicProfile;
