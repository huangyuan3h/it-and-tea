import { useEffect, useState } from 'react';

export const useWindowWidth = (): number => {
  const w = typeof window !== 'undefined' ? window : null;

  const [windowWidth, setWidth] = useState(w?.innerWidth ?? 0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return windowWidth;
};
