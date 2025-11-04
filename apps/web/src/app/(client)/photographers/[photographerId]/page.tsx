import LanguageTag from '@/components/language-tag';
import { Avatar, AvatarImage } from '@shotly/ui/components/avatar';
import { Badge } from '@shotly/ui/components/badge';
import { Button, buttonVariants } from '@shotly/ui/components/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@shotly/ui/components/card';
import { Logo } from '@shotly/ui/components/logo';
import { Separator } from '@shotly/ui/components/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@shotly/ui/components/tooltip';
import { cn } from '@shotly/ui/lib/utils';
import usersRepository from '@/repositories/users.repository';
import {
  BadgeCheckIcon,
  CalendarIcon,
  GlobeIcon,
  HeartIcon,
  InstagramIcon,
  LanguagesIcon,
  LogInIcon,
  MapPinIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  const coverImageUrl = profile.coverImageUrl || '/default-cover.jpg';
  const profileImageUrl = profile.image || undefined;

  return (
    <div>
      <div className="h-65 overflow-hidden relative">
        <div className="absolute left-2 top-2 flex items-center w-full px-10 justify-between z-2">
          <Logo />
          <div className="space-x-3 backdrop-blur-2xl bg-white/30 p-2 rounded-full">
            <Link href="" className={cn(buttonVariants(), 'rounded-full')}>
              Home
            </Link>
            <Link
              href=""
              className={cn(buttonVariants({ variant: 'link' }), 'text-muted')}
            >
              Photographers
            </Link>
            <Link
              href=""
              className={cn(buttonVariants({ variant: 'link' }), 'text-muted')}
            >
              How it works?
            </Link>
          </div>
          <div className="backdrop-blur-2xl bg-white/30 p-2 rounded-full flex items-center">
            <Link
              href="/auth"
              className={cn(
                buttonVariants({ variant: 'link' }),
                'rounded-full text-muted items-center',
              )}
            >
              <LogInIcon /> <span>Sign In</span>
            </Link>
            <Link href="/auth" className={cn(buttonVariants(), 'rounded-full')}>
              Sign Up
            </Link>
          </div>
        </div>
        <Image
          alt="Cover image"
          src={coverImageUrl}
          width={1000}
          height={400}
          className="w-full h-full object-cover inline-block"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/50 z-1" />
      </div>
      <div className="max-w-5xl px-4 m-auto">
        <div className="-translate-y-1/2 flex justify-between">
          <Avatar className="rounded-full w-40 h-40 border-3 border-white">
            <AvatarImage src={profileImageUrl} alt={profile.name} />
          </Avatar>
          <div className="flex items-center pt-20 gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost">
                  <HeartIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Bookmark</TooltipContent>
            </Tooltip>
            <Button>Book Now</Button>
          </div>
        </div>
        <div className="-mt-13 flex">
          <div>
            <h1 className="text-2xl font-bold inline-flex items-center gap-2">
              {profile.name}{' '}
              {profile.username && (
                <span className="text-sm font-normal text-muted-foreground">
                  @{profile.username}
                </span>
              )}
            </h1>
            {profile.bio && (
              <p className="text-muted-foreground text-sm max-w-2/3 mb-3">
                {profile.bio}
              </p>
            )}
            <div className="inline-flex gap-3 items-center h-5 flex-wrap">
              {profile.websiteUrl && (
                <>
                  <div className="flex items-center gap-1 text-sm">
                    <GlobeIcon className="w-4 text-muted-foreground" />
                    <a
                      href={profile.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-500 hover:underline"
                    >
                      {profile.websiteUrl.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                  <Separator orientation="vertical" />
                </>
              )}
              {profile.instagramTag && (
                <>
                  <div className="flex items-center gap-1 text-sm">
                    <InstagramIcon className="w-4 text-muted-foreground" />
                    <a
                      href={`https://instagram.com/${profile.instagramTag}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-500 hover:underline"
                    >
                      {profile.instagramTag}
                    </a>
                  </div>
                  <Separator orientation="vertical" />
                </>
              )}
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <CalendarIcon className="w-4" />
                <p>Joined {formatDate(profile.createdAt)}</p>
              </div>
              {profile.yearsOfExperience !== null &&
                profile.yearsOfExperience > 0 && (
                  <>
                    <Separator orientation="vertical" />
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <BadgeCheckIcon className="w-4" />
                      <p>
                        {profile.yearsOfExperience} year
                        {profile.yearsOfExperience !== 1 ? 's' : ''} experience
                      </p>
                    </div>
                  </>
                )}
            </div>
          </div>
        </div>
        <Separator className="my-5" />
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Additonal Info</CardTitle>
          </CardHeader>
          <CardContent className="flex">
            <div className="flex-1/2">
              <p className="font-medium text-xs text-muted-foreground mb-2 inline-flex gap-1 items-center">
                <LanguagesIcon className="w-4" /> Languages
              </p>
              <div className="flex gap-3 mb-4 flex-wrap">
                {profile.languages.length > 0 ? (
                  profile.languages.map((language) => (
                    <LanguageTag
                      key={language.code}
                      name={language.name}
                      flag={language.flag}
                      code={language.code}
                    />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No languages specified
                  </p>
                )}
              </div>
            </div>
            <div className="flex-1/2">
              <p className="font-medium text-xs text-muted-foreground mb-2 inline-flex gap-1 items-center">
                <MapPinIcon className="w-4" /> Locations
              </p>
              <div className="flex gap-3 flex-wrap">
                {profile.locations.length > 0 ? (
                  profile.locations.map((location) => (
                    <Badge variant="outline" key={location.externalId}>
                      {location.displayName}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No locations specified
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PhotographerPublicProfile;
