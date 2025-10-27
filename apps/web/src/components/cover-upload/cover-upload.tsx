import { CoverImagePlaceholder } from '@/components/cover-upload/cover-image-placeholder';
import { Button } from '@shotly/ui/components/button';
import { ImageIcon } from 'lucide-react';
import React from 'react';

function CoverUpload() {
  return (
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
  );
}

export default CoverUpload;
