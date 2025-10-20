const StorageUsage = () => {
  return (
    <div className="p-3">
      <div className="text-sm text-gray-600 mb-2">Storage Used</div>
      <div className="bg-gray-200 rounded-full h-2 mb-2">
        <div className="bg-primary h-2 rounded-full w-3/4"></div>
      </div>
      <div className="text-xs text-gray-500">7.2 GB of 10 GB used</div>
    </div>
  );
};

export { StorageUsage };
