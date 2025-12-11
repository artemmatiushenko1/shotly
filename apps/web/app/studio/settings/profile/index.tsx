'use client';

import { CircleXIcon, ExternalLink, InstagramIcon } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useActionState, useId, useState } from 'react';

import { Language } from '@/entities/models/language';
import { LocationDetails } from '@/entities/models/locations';
import { UserProfile } from '@/entities/models/user';

import { Button, buttonVariants } from '@shotly/ui/components/button';
import { Input } from '@shotly/ui/components/input';
import { Textarea } from '@shotly/ui/components/textarea';
import { cn } from '@shotly/ui/lib/utils';

import CoverUpload from '../../../_components/cover-upload/cover-upload';
import { LabeledControl } from '../labeled-control';
import { updateProfileAction } from './actions';
import { ExperienceSlider } from './experience-slider';
import { LanguageSelector } from './language-selector';
import { LocationSelector } from './location-selector';
import { ProfileImageUpload } from './profile-image-upload';
import { SocialLinkInput } from './social-link-input';

type ProfileSettingsProps = {
  userId: string;
  profile: UserProfile;
  languageOptions: Language[];
};

const ProfileSettings = (props: ProfileSettingsProps) => {
  const { profile, languageOptions } = props;

  const t = useTranslations('settings.profile');

  const [state, formAction, pending] = useActionState(updateProfileAction, {
    hasErrors: false,
  });
  const { validationErrors } = state;

  const [languages, setLanguages] = useState<Language[]>(profile.languages);
  const [locations, setLocations] = useState<LocationDetails[]>(
    profile.locations,
  );

  const bioId = useId();
  const fullNameId = useId();
  const usernameId = useId();
  const languagesId = useId();
  const instagramTagId = useId();
  const experienceYearsId = useId();
  const personalWebsiteUrlId = useId();
  const profileImageId = useId();

  return (
    <div className="space-y-8 pb-4">
      <div className="flex">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            {t('title')}
          </h2>
          <p className="text-sm text-muted-foreground">{t('description')}</p>
        </div>
        <div className="ml-auto space-y-1">
          <p className="text-xs text-muted-foreground text-right">
            {t('viewPublicProfile')}
          </p>
          <div className="relative">
            <Input
              readOnly
              className="pr-10 w-xs"
              value={`shotly.com/photographers/${profile.username}`}
            />
            <Link
              target="_blank"
              href={`/photographers/${profile.username}`}
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                'absolute right-1 top-1/2 -translate-y-1/2 text-sm text-muted-foreground hover:bg-transparent',
              )}
            >
              <ExternalLink />
            </Link>
          </div>
        </div>
      </div>
      <form className="space-y-8" action={formAction}>
        <CoverUpload
          name="coverImageUrl"
          existingImageUrl={profile.coverImageUrl ?? undefined}
          error={validationErrors?.fieldErrors.coverImageUrl?.toString()}
        />
        <LabeledControl
          title={t('fields.fullName.title')}
          description={t('fields.fullName.description')}
          controlId={fullNameId}
          controlNode={
            <Input
              id={fullNameId}
              name="name"
              defaultValue={profile.name}
              error={validationErrors?.fieldErrors.name?.toString()}
            />
          }
        />
        <LabeledControl
          title={t('fields.username.title')}
          description={t('fields.username.description')}
          controlId={usernameId}
          controlNode={
            <Input
              id={usernameId}
              name="username"
              defaultValue={profile.username ?? undefined}
              error={validationErrors?.fieldErrors.username?.toString()}
            />
          }
        />
        <LabeledControl
          title={t('fields.profilePhoto.title')}
          description={t('fields.profilePhoto.description')}
          controlNode={
            <ProfileImageUpload
              existingImageUrl={profile.image}
              inputName="profileImageUrl"
              inputId={profileImageId}
              error={validationErrors?.fieldErrors.profileImageUrl?.toString()}
              onDeleteExisting={() => {
                // TODO: implement delete functionality for existing image
              }}
            />
          }
        />
        <LabeledControl
          title={t('fields.about.title')}
          description={t('fields.about.description')}
          controlId={bioId}
          controlNode={
            <Textarea
              id={bioId}
              name="bio"
              defaultValue={profile.bio ?? undefined}
              className="min-h-32 resize-none"
            />
          }
        />

        <LabeledControl
          title={t('fields.experience.title')}
          description={t('fields.experience.description')}
          controlId={experienceYearsId}
          controlNode={
            <ExperienceSlider
              name="yearsOfExperience"
              inputId={experienceYearsId}
              defaultYears={profile.yearsOfExperience ?? undefined}
              error={validationErrors?.fieldErrors.yearsOfExperience?.toString()}
            />
          }
        />

        <LabeledControl
          title={t('fields.locations.title')}
          description={t('fields.locations.description')}
          controlId="locations"
          controlNode={
            <>
              <LocationSelector
                inputId="locations"
                value={locations}
                onChange={setLocations}
                error={validationErrors?.fieldErrors.locations?.toString()}
              />
              <input
                type="hidden"
                name="locations"
                value={JSON.stringify(locations)}
              />
            </>
          }
        />

        <LabeledControl
          title={t('fields.languages.title')}
          description={t('fields.languages.description')}
          controlId={languagesId}
          controlNode={
            <>
              <LanguageSelector
                value={languages}
                inputId={languagesId}
                languageOptions={languageOptions}
                onChange={(newLanguages) => setLanguages(newLanguages)}
                error={validationErrors?.fieldErrors.languages?.toString()}
              />
              <input
                type="hidden"
                name="languages"
                value={languages.map((language) => language.code)}
              />
            </>
          }
        />

        <LabeledControl
          title={t('fields.personalWebsite.title')}
          description={t('fields.personalWebsite.description')}
          controlId={personalWebsiteUrlId}
          controlNode={
            <Input
              id={personalWebsiteUrlId}
              name="websiteUrl"
              defaultValue={profile.websiteUrl ?? undefined}
              error={validationErrors?.fieldErrors.websiteUrl?.toString()}
            />
          }
        />

        <LabeledControl
          title={t('fields.socialLinks.title')}
          description={t('fields.socialLinks.description')}
          controlNode={
            <SocialLinkInput
              id={instagramTagId}
              name="instagramTag"
              socialIcon={<InstagramIcon />}
              socialBaseUrl="instagram.com/"
              defaultValue={profile.instagramTag ?? undefined}
              error={validationErrors?.fieldErrors.instagramTag?.toString()}
            />
          }
        />

        <div className="flex gap-3 justify-between items-center">
          {state.hasErrors && (
            <p className="text-sm inline-flex gap-2 items-center text-destructive">
              <CircleXIcon className="size-4" />
              {t('errors.saveFailed')}
            </p>
          )}
          <div className="space-x-3 ml-auto">
            {/* TODO: implement form reset */}
            <Button type="button" variant="ghost">
              {t('actions.cancel')}
            </Button>
            <Button type="submit" loading={pending}>
              {t('actions.saveChanges')}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export { ProfileSettings };
