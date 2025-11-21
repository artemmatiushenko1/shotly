import { Avatar, AvatarImage } from '@shotly/ui/components/avatar';
import { Button } from '@shotly/ui/components/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@shotly/ui/components/tooltip';
import usersRepository from '@/repositories/users.repository';
import { ArrowUpRightIcon, BookmarkIcon } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ProfileTabs from './tabs';

type PhotographerPublicProfileProps = {
  params: Promise<{ photographerId: string }>;
};

async function PhotographerPublicProfile({
  params,
}: PhotographerPublicProfileProps) {
  const { photographerId } = await params;

  const profile = await usersRepository.getUserProfile(photographerId);

  if (!profile) {
    notFound();
  }

  const coverImageUrl = profile.coverImageUrl || '/default-cover.jpg';
  const profileImageUrl = profile.image || undefined;

  return (
    <div>
      <div className="h-70 overflow-hidden relative p-3">
        <div className="rounded-3xl w-full h-full overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/60 z-1" />
          <Image
            alt="Cover image"
            src={coverImageUrl}
            width={1000}
            height={400}
            className="w-full h-full object-cover inline-block"
          />
        </div>
      </div>
      <div className="max-w-6xl px-4 m-auto">
        <div className="-translate-y-1/2 flex z-100 relative">
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
              <TooltipContent>Bookmark</TooltipContent>
            </Tooltip>
            <Button className="rounded-full">Book Now</Button>
          </div>
        </div>
        <div className="-mt-13 flex">
          <div className="grid grid-cols-7 gap-12 pb-12">
            <div className="col-span-4 space-y-8">
              <div>
                <h3 className="text-lg font-bold mb-3">About me</h3>
                <div className="leading-relaxed space-y-4 text-muted-foreground">
                  {/* Add about me text to profile in db*/}
                  <p>
                    Passionate about visual storytelling and creating lasting
                    memories. My work has been featured in local exhibitions and
                    online publications. I believe every shoot is unique and
                    strive to make my clients feel comfortable and confident in
                    front of the camera.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6 col-span-3">
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-x-9 gap-y-6">
                {/* Website */}
                {profile.websiteUrl && (
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                      Website
                    </h4>
                    <a
                      href={`${profile.websiteUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 font-medium hover:text-primary transition-colors group"
                    >
                      {profile.websiteUrl.replace(/^https?:\/\//, '')}
                      <ArrowUpRightIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                    </a>
                  </div>
                )}

                {profile.yearsOfExperience && (
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                      Experience
                    </h4>
                    <span className="font-medium">
                      {profile.yearsOfExperience} years
                    </span>
                  </div>
                )}

                {/* Email (Mock) */}
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                    Email
                  </h4>
                  <a
                    href={`mailto:hello@${profile.username}.com`}
                    className="flex items-center gap-2 font-medium hover:text-primary transition-colors group"
                  >
                    hello@{profile.username}.com
                    <ArrowUpRightIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                  </a>
                </div>

                {/* Social */}
                {profile.instagramTag && (
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                      Social
                    </h4>
                    <a
                      href={`https://instagram.com/${profile.instagramTag}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 font-medium hover:text-primary transition-colors group"
                    >
                      @{profile.instagramTag}
                      <ArrowUpRightIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                    </a>
                  </div>
                )}

                {/* Location */}
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                    Locations
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
                      Languages
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
