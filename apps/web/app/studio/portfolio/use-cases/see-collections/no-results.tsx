import { RotateCcwIcon, SearchXIcon } from 'lucide-react';
import React from 'react';

import { Button } from '@shotly/ui/components/button';

import EmptyState from '../../../../_components/empty-state';

type NoResultsProps = {
  className?: string;
  onClearFilters: () => void;
};

function NoResults({ className, onClearFilters }: NoResultsProps) {
  return (
    <EmptyState
      title="No collections found"
      description="Try adjusting your search or filters to find what you're looking for."
      icon={SearchXIcon}
      className={className}
      action={
        <Button variant="outline" size="sm" onClick={onClearFilters}>
          <RotateCcwIcon />
          Clear Filters
        </Button>
      }
    />
  );
}

export default NoResults;
