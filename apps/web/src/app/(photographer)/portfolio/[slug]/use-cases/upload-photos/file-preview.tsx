import { Button } from '@shotly/ui/components/button';
import { Spinner } from '@shotly/ui/components/spinner';
import { Trash2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { formatBytes } from '../../utils';

type FilePreviewProps = {
  isLoading: boolean;
  file: { id: string; file: File; preview: string };
  onRemove: (id: string) => void;
};

function FilePreview(props: FilePreviewProps) {
  const { file, onRemove, isLoading } = props;

  const t = useTranslations();

  return (
    <div
      key={file.id}
      className="flex items-center space-x-3 p-3 bg-muted/50 rounded-md"
    >
      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
        <Image
          src={file.preview}
          alt={file.file.name}
          width={120}
          height={120}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium truncate">{file.file.name}</h4>
        <p className="text-sm text-muted-foreground">
          {formatBytes(file.file.size, t)}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        {isLoading ? (
          <Spinner size="sm" className="mr-2 text-primary" />
        ) : (
          <Button
            size="icon"
            variant="ghost"
            className="text-muted-foreground"
            onClick={() => onRemove(file.id)}
          >
            <Trash2Icon />
          </Button>
        )}
      </div>
    </div>
  );
}

export default FilePreview;
