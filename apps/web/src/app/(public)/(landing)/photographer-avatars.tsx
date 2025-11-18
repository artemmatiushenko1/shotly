import React from 'react';
import { Avatar, AvatarImage } from '@shotly/ui/components/avatar';

// Using existing profile images from the public folder
const AVATAR_IMAGES = [
  'avatar-1.jpg',
  'avatar-2.jpg',
  'avatar-3.jpg',
  'avatar-4.jpg',
  'avatar-5.jpg',
  'avatar-6.jpg',
  'avatar-7.jpg',
];

// Positions for circular avatars in an elliptical pattern around the hero section
const AVATAR_POSITIONS = [
  // { top: '5%', left: '10%', size: 60 },
  { top: '15%', left: '5%', size: 50 },
  { top: '25%', left: '15%', size: 55 },
  { top: '35%', left: '8%', size: 45 },
  { top: '12%', right: '12%', size: 65 },
  { top: '18%', right: '8%', size: 52 },
  { top: '28%', right: '15%', size: 58 },
  { top: '38%', right: '10%', size: 48 },
  { bottom: '25%', left: '14%', size: 62 },
  { bottom: '35%', left: '6%', size: 54 },
  { bottom: '15%', right: '14%', size: 56 },
  { bottom: '28%', right: '7%', size: 50 },
];

function PhotographerAvatars() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {AVATAR_POSITIONS.map((position, index) => {
        const avatarImage = AVATAR_IMAGES[index % AVATAR_IMAGES.length];
        const positionStyle: React.CSSProperties = {
          position: 'absolute',
          width: `${position.size}px`,
          height: `${position.size}px`,
          zIndex: 2,
        };

        if (position.top) positionStyle.top = position.top;
        if (position.bottom) positionStyle.bottom = position.bottom;
        if (position.left) positionStyle.left = position.left;
        if (position.right) positionStyle.right = position.right;

        return (
          <div
            key={`avatar-${index}`}
            className="rounded-full overflow-hidden border-2 border-white shadow-lg ring-2 ring-purple-200/50 hover:ring-purple-400/50 transition-all duration-300 hover:scale-110"
            style={positionStyle}
          >
            <Avatar className="w-full h-full">
              <AvatarImage
                src={avatarImage}
                alt={`Photographer ${index + 1}`}
                className="object-cover"
              />
            </Avatar>
          </div>
        );
      })}
    </div>
  );
}

export default PhotographerAvatars;
