import FilePreview from './file-preview';

type SelectedFilesListProps = {
  files: { id: string; file: File; preview: string }[];
  onRemove: (fileId: string) => void;
};

function SelectedFilesList({ files, onRemove }: SelectedFilesListProps) {
  return (
    <div className="space-y-3 pb-4 max-h-64 overflow-y-auto">
      {files.map((file) => (
        <FilePreview key={file.id} file={file} onRemove={onRemove} />
      ))}
    </div>
  );
}

export default SelectedFilesList;
