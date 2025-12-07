import { createContext, useContext, useState } from 'react';

import GradientLoadingProgress from '../../../../../_components/gradient-progress';

const CollectionSettingsLoadingContext = createContext<{
  loading: boolean;
  setLoading: (loading: boolean) => void;
}>({
  loading: false,
  setLoading: () => {},
});

export default CollectionSettingsLoadingContext;

export const useCollectionSettingsLoading = () => {
  return useContext(CollectionSettingsLoadingContext);
};

export const CollectionSettingsLoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <CollectionSettingsLoadingContext.Provider value={{ loading, setLoading }}>
      <div className="absolute top-0 left-0 w-full overflow-hidden rounded-t-sm">
        {loading && <GradientLoadingProgress />}
      </div>
      {children}
    </CollectionSettingsLoadingContext.Provider>
  );
};
