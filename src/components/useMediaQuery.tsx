import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false); // Start false for safety

  useEffect(() => {
    if (typeof window === 'undefined') return; // Skip during SSR

    const media = window.matchMedia(query);
    const updateMatch = () => setMatches(media.matches);

    updateMatch(); // Set initial
    media.addEventListener('change', updateMatch);

    return () => {
      media.removeEventListener('change', updateMatch);
    };
  }, [query]);

  return matches;
}
