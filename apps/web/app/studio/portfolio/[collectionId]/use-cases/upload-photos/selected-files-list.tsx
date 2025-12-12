import FilePreview from './file-preview';

type SelectedFilesListProps = {
  isUploading: boolean;
  files: { id: string; file: File; preview: string }[];
  onRemove: (fileId: string) => void;
};

function SelectedFilesList({
  files,
  onRemove,
  isUploading,
}: SelectedFilesListProps) {
  return (
    <div className="space-y-3 pb-4 max-h-64 overflow-y-auto">
      {files.map((file) => (
        <FilePreview
          key={file.id}
          file={file}
          onRemove={onRemove}
          isLoading={isUploading}
        />
      ))}
    </div>
  );
}

export default SelectedFilesList;
