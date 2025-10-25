import { Avatar, AvatarImage } from '@shotly/ui/components/avatar';
import { Button, buttonVariants } from '@shotly/ui/components/button';
import { Logo } from '@shotly/ui/components/logo';
import { Separator } from '@shotly/ui/components/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@shotly/ui/components/tooltip';
import { cn } from '@shotly/ui/lib/utils';
import {
  BadgeCheckIcon,
  CalendarIcon,
  GlobeIcon,
  HeartIcon,
  InstagramIcon,
  LogInIcon,
  StarIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PhotographerPublicProfile = () => {
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
          alt=""
          src="/default-cover.jpg"
          width={1000}
          height={400}
          className="w-full h-full object-cover inline-block"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/50 z-1" />
      </div>
      <div className="max-w-5xl px-4 m-auto">
        <div className="-translate-y-1/2 flex justify-between">
          <Avatar className="rounded-full w-40 h-40 border-3 border-white">
            <AvatarImage src="https://avatars.githubusercontent.com/u/71723893?v=4" />
          </Avatar>
          <div className="flex items-center pt-20 gap-2">
            <Tooltip>
              <TooltipTrigger>
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
              Artem Matiushenko{' '}
              <span className="text-sm font-normal text-muted-foreground">
                @_artemko
              </span>
            </h1>
            <p className="text-muted-foreground text-sm max-w-2/3 mb-3">
              A product designer and UX researcher based in the Czechia. I have
              a deep passion for technology and thrive as a problem solver. My
              ultimate aim is to blend logical solution with creative
              expression.
            </p>
            <div className="inline-flex gap-3 items-center h-5">
              <div className="flex items-center gap-1 text-sm">
                <GlobeIcon className="w-4 text-muted-foreground" />
                <p className="text-sky-500">www.artemko.com</p>
              </div>
              <Separator orientation="vertical" />
              <div className="flex items-center gap-1 text-sm">
                <InstagramIcon className="w-4 text-muted-foreground" />
                <p className="text-sky-500">_artemko</p>
              </div>
              <Separator orientation="vertical" />
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <CalendarIcon className="w-4" />
                <p>Joined July 2025</p>
              </div>
              <Separator orientation="vertical" />
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <StarIcon className="w-4 fill-orange-300 stroke-orange-300" />
                <p>
                  <span className="font-bold">5.0</span> (45 reviews)
                </p>
              </div>
              <Separator orientation="vertical" />
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <BadgeCheckIcon className="w-4" />
                <p>5 years experience</p>
              </div>
            </div>
          </div>
        </div>
        <Separator className="mt-5" />
      </div>
    </div>
  );
};

export default PhotographerPublicProfile;
