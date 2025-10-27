'use client';

import { Button } from '@shotly/ui/components/button';
import { Input } from '@shotly/ui/components/input';
import { Textarea } from '@shotly/ui/components/textarea';
import {
  ImageIcon,
  Trash2,
  Upload,
  InstagramIcon,
  GlobeIcon,
} from 'lucide-react';
import { SocialLinkInput } from './social-link-input';
import { LabeledControl } from './labeled-control';
import { CoverImagePlaceholder } from './cover-image-placeholder';
import { ProfileImagePlaceholder } from './profile-image-placeholder';
import { LocationSelector } from './location-selector';
import { LanguageSelector } from './language-selector';
import { ExperienceSlider } from './experience-slider';
import { redirect } from 'next/navigation';

const ProfileSettings = () => {
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
      <CoverImagePlaceholder className="p-8">
        <div className="absolute bottom-4 right-4 flex gap-3">
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/90 hover:bg-white"
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Edit your cover image
          </Button>
        </div>
      </CoverImagePlaceholder>
      <LabeledControl
        title="Full name"
        description="Your display name"
        controlId="fullname"
        controlNode={<Input id="fullname" defaultValue="Monique Wu" />}
      />
      <LabeledControl
        title="Username"
        description="Your display username"
        controlId="fullname"
        controlNode={<Input id="username" defaultValue="_artemko" />}
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
        controlId="about"
        controlNode={
          <Textarea
            id="about"
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
        controlId="website"
        controlNode={<Input id="website" defaultValue="medium.com/monique" />}
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
    </div>
  );
};

export { ProfileSettings };
