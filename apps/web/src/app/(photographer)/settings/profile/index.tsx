'use client';

import { Button } from '@shotly/ui/components/button';
import { Input } from '@shotly/ui/components/input';
import { Textarea } from '@shotly/ui/components/textarea';
import { Trash2, Upload, InstagramIcon, GlobeIcon } from 'lucide-react';
import { SocialLinkInput } from './social-link-input';
import { LabeledControl } from './labeled-control';
import { ProfileImagePlaceholder } from './profile-image-placeholder';
import { LocationSelector } from './location-selector';
import { LanguageSelector } from './language-selector';
import { ExperienceSlider } from './experience-slider';
import { redirect } from 'next/navigation';
import CoverUpload from '@/components/cover-upload/cover-upload';
import { useActionState, useId } from 'react';
import { updateProfileAction } from './actions';

enum FormField {
  NAME = 'name',
  USERNAME = 'username',
  BIO = 'bio',
  WEBSITE_URL = 'websiteUrl',
}

const ProfileSettings = () => {
  const [state, formAction, pending] = useActionState(updateProfileAction, {});

  const bioId = useId();
  const fullNameId = useId();
  const usernameId = useId();
  const personalWebsiteUrlId = useId();

  return (
    <div className="space-y-8 pb-4">
      <div className="flex">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Profile</h2>
          <p className="text-sm text-muted-foreground">
            Update your photo and personal details
          </p>
        </div>
        <div className="ml-auto space-y-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => redirect('/photographers/artemko')}
          >
            <GlobeIcon /> View public profile
          </Button>
          <p className="text-xs text-muted-foreground">
            www.shotly.com/ph/artemko
          </p>
        </div>
      </div>
      <form className="space-y-8" action={formAction}>
        <CoverUpload />
        <LabeledControl
          title="Full name"
          description="Your display name"
          controlId={fullNameId}
          controlNode={
            <Input
              id={fullNameId}
              name={FormField.NAME}
              defaultValue="Monique Wu"
              error={state.validationErrors?.fieldErrors.name?.toString()}
            />
          }
        />
        <LabeledControl
          title="Username"
          description="Your display username"
          controlId={usernameId}
          controlNode={
            <Input
              id={usernameId}
              name={FormField.USERNAME}
              defaultValue="_artemko"
              error={state.validationErrors?.fieldErrors.username?.toString()}
            />
          }
        />
        <LabeledControl
          title="Profile photo"
          description="This photo will be visible to others"
          controlNode={
            <div className="flex items-start gap-6">
              <ProfileImagePlaceholder />
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload new image
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete current image
                </Button>
              </div>
            </div>
          }
        />
        <LabeledControl
          title="About you"
          description="Write a description for your profile"
          controlId={bioId}
          controlNode={
            <Textarea
              id={bioId}
              name={FormField.BIO}
              defaultValue="A product designer and UX researcher based in the Czechia. I have a deep passion for technology and thrive as a problem solver.&#10;&#10;My ultimate aim is to blend logical solution with creative expression."
              className="min-h-32 resize-none"
            />
          }
        />

        <LabeledControl
          title="Experience"
          description="How many years you've been shooting"
          controlId="experience"
          controlNode={<ExperienceSlider inputId="experience" />}
        />

        <LabeledControl
          title="Locations"
          description="Cities or regions where clients can book you"
          controlId="locations"
          controlNode={<LocationSelector inputId="locations" />}
        />

        <LabeledControl
          title="Languages"
          description="Languages you can comfortably use with clients"
          controlId="languages"
          controlNode={<LanguageSelector inputId="languages" />}
        />

        <LabeledControl
          title="Personal website"
          description="Your online page, blog, or company site"
          controlId={personalWebsiteUrlId}
          controlNode={
            <Input
              id={personalWebsiteUrlId}
              name={FormField.WEBSITE_URL}
              defaultValue="https://www.medium.com/monique"
              error={state.validationErrors?.fieldErrors.websiteUrl?.toString()}
            />
          }
        />

        <LabeledControl
          title="Connect with work socials"
          description="Add social links"
          controlNode={
            <SocialLinkInput
              socialIcon={<InstagramIcon />}
              socialHandle="_artemko"
              socialBaseUrl="instagram.com/"
            />
          }
        />

        <div className="flex gap-3 justify-end">
          <Button type="button" variant="ghost">
            Cancel
          </Button>
          <Button type="submit" loading={pending}>
            Save changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export { ProfileSettings };
