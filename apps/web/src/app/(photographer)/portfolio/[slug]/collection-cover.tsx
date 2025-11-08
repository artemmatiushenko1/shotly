import ImagePlaceholder from '@/components/image-placeholder';
import Image from 'next/image';
import React from 'react';

type CollectionCoverProps = {
  coverImageUrl?: string | null;
  children: React.ReactNode;
};

const CollectionCover = (props: CollectionCoverProps) => {
  const { coverImageUrl, children } = props;

  return (
    <div className="w-full h-60 relative">
      {coverImageUrl ? (
        <Image
          className="w-full h-full object-cover rounded-md mt-2 border"
          src={coverImageUrl}
          width={400}
          height={200}
          alt="Cover image of the collection"
        />
      ) : (
        <ImagePlaceholder />
      )}
      {React.Children.only(children)}
    </div>
  );
};

export { CollectionCover };
