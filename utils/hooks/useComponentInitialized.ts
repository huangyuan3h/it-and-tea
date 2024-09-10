import { useState, useEffect } from 'react';

export const useComponentInitialized = (): boolean => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  return isInitialized;
};
