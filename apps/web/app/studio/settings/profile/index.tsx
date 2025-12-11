'use client';

import { ExternalLink, InstagramIcon } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useActionState, useEffect, useId, useState } from 'react';

import { Language } from '@/entities/models/language';
import { LocationDetails } from '@/entities/models/locations';
import { UserProfile } from '@/entities/models/user';

import { Button, buttonVariants } from '@shotly/ui/components/button';
import { Input } from '@shotly/ui/components/input';
import { toast } from '@shotly/ui/components/sonner';
import { Textarea } from '@shotly/ui/components/textarea';
import { cn } from '@shotly/ui/lib/utils';

import CoverUpload from '../../../_components/cover-upload/cover-upload';
import { LabeledControl } from '../labeled-control';
import { ExperienceSlider } from './experience-slider';
import { LanguageSelector } from './language-selector';
import { LocationSelector } from './location-selector';
import { updateProfileAction } from './profile-form.actions';
import { ProfileFormState } from './profile-form.schema';
import { ProfileImageUpload } from './profile-image-upload';
import { SocialLinkInput } from './social-link-input';

type ProfileSettingsProps = {
  userId: string;
  profile: UserProfile;
  languageOptions: Language[];
};

const INITIAL_STATE: ProfileFormState = {
  status: 'idle',
  message: '',
};

const ProfileSettings = (props: ProfileSettingsProps) => {
  const { profile, languageOptions } = props;

  const t = useTranslations('settings.profile');

  const [state, formAction, isPending] = useActionState(
    updateProfileAction,
    INITIAL_STATE,
  );

  useEffect(() => {
    if (state.status === 'success') {
      toast.success(t('success.profileUpdated'));
    }

    if (state.status === 'error') {
      toast.error(t('errors.saveFailed'));
    }
  }, [state.status, t]);

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
  const aboutMeId = useId();

  const errors = state.errors ?? {};
  const values = { ...profile, ...state.inputs };

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
              className="pr-10"
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
          // Specifing key prop helps to reset underlying input with image url
          key={values.coverImageUrl}
          existingImageUrl={values.coverImageUrl ?? undefined}
          error={errors.coverImageUrl?.join(', ')}
        />
        <LabeledControl
          title={t('fields.fullName.title')}
          description={t('fields.fullName.description')}
          controlId={fullNameId}
          controlNode={
            <Input
              id={fullNameId}
              name="name"
              defaultValue={values.name}
              error={errors.name?.join(', ')}
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
              defaultValue={values.username}
              error={errors.username?.toString()}
            />
          }
        />
        <LabeledControl
          title={t('fields.profilePhoto.title')}
          description={t('fields.profilePhoto.description')}
          controlNode={
            <ProfileImageUpload
              // Specifing key prop helps to reset underlying input with image url
              key={values.profileImageUrl}
              existingImageUrl={values.profileImageUrl}
              inputName="profileImageUrl"
              inputId={profileImageId}
              error={errors.profileImageUrl?.join(', ')}
            />
          }
        />
        <LabeledControl
          title={t('fields.shortBio.title')}
          description={t('fields.shortBio.description')}
          controlId={bioId}
          controlNode={
            <Input
              id={bioId}
              name="bio"
              placeholder={t('fields.shortBio.placeholder')}
              defaultValue={values.bio ?? undefined}
              error={errors.bio?.join(', ')}
            />
          }
        />
        <LabeledControl
          title={t('fields.about.title')}
          description={t('fields.about.description')}
          controlId={aboutMeId}
          controlNode={
            <Textarea
              id={aboutMeId}
              name="aboutMe"
              placeholder={t('fields.about.placeholder')}
              defaultValue={values.aboutMe ?? undefined}
              className="min-h-32 resize-none"
              error={errors.bio?.join(', ')}
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
              defaultYears={values.yearsOfExperience ?? undefined}
              error={errors.yearsOfExperience?.join(', ')}
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
                error={errors.locations?.join(', ')}
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
                error={errors.languages?.join(', ')}
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
              placeholder="https://example.com"
              defaultValue={values.websiteUrl ?? undefined}
              error={errors.websiteUrl?.join(', ')}
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
              defaultValue={values.instagramTag ?? undefined}
              error={errors.instagramTag?.join(', ')}
            />
          }
        />
        <div className="flex gap-3 justify-between items-center">
          <div className="space-x-3 ml-auto">
            <Button type="submit" loading={isPending}>
              {t('actions.saveChanges')}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export { ProfileSettings };
