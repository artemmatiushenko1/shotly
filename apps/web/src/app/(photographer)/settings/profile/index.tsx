'use client';

import { Button } from '@shotly/ui/components/button';
import { Input } from '@shotly/ui/components/input';
import { Textarea } from '@shotly/ui/components/textarea';
import { InstagramIcon, GlobeIcon, CircleXIcon } from 'lucide-react';
import { SocialLinkInput } from './social-link-input';
import { LabeledControl } from '../labeled-control';
import { LocationSelector } from './location-selector';
import { LanguageSelector } from './language-selector';
import { ExperienceSlider } from './experience-slider';
import { useRouter } from 'next/navigation';
import CoverUpload from '@/components/cover-upload/cover-upload';
import { useActionState, useId, useState } from 'react';
import { updateProfileAction } from './actions';
import { UserProfile } from '@/domain/user';
import { Language } from '@/domain/language';
import { LocationDetails } from '@/domain/locations';
import { ProfileImageUpload } from './profile-image-upload';
import { useTranslations } from 'next-intl';

enum FormField {
  NAME = 'name',
  BIO = 'bio',
  USERNAME = 'username',
  LANGUAGES = 'languages',
  LOCATIONS = 'locations',
  WEBSITE_URL = 'websiteUrl',
  INSTAGRAM_TAG = 'instagramTag',
  EXPERIENCE_YEARS = 'yearsOfExperience',
  PROFILE_IMG = 'profileImg',
  COVER_IMG = 'coverImg',
}

type ProfileSettingsProps = {
  userId: string;
  profile: UserProfile;
  languageOptions: Language[];
};

const ProfileSettings = (props: ProfileSettingsProps) => {
  const { profile, languageOptions, userId } = props;
  const t = useTranslations('settings.profile');
  const router = useRouter();

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
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/photographers/${userId}`)}
          >
            <GlobeIcon /> {t('viewPublicProfile')}
          </Button>
          <p className="text-xs text-muted-foreground">
            www.shotly.com/photographers/{profile.username}
          </p>
        </div>
      </div>
      <form className="space-y-8" action={formAction}>
        <CoverUpload
          name={FormField.COVER_IMG}
          existingImageUrl={profile.coverImageUrl}
          error={validationErrors?.fieldErrors.coverImg?.toString()}
        />
        <LabeledControl
          title={t('fields.fullName.title')}
          description={t('fields.fullName.description')}
          controlId={fullNameId}
          controlNode={
            <Input
              id={fullNameId}
              name={FormField.NAME}
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
              name={FormField.USERNAME}
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
              inputName={FormField.PROFILE_IMG}
              inputId={profileImageId}
              error={validationErrors?.fieldErrors.profileImg?.toString()}
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
              name={FormField.BIO}
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
              name={FormField.EXPERIENCE_YEARS}
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
                name={FormField.LOCATIONS}
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
                name={FormField.LANGUAGES}
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
              name={FormField.WEBSITE_URL}
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
              name={FormField.INSTAGRAM_TAG}
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
