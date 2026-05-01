'use client';

import { useEffect } from 'react';

export function useFavicon(theme?: string) {
  useEffect(() => {
    if (!theme) return;

    const map: Record<string, string> = {
      light: '/icon-light.svg',
      dark: '/icon-dark.svg',
      panda: '/icon-panda.svg',
    };

    const href = map[theme] ?? '/favicon.ico';

    const finalHref = `${href}?v=${theme}`;

    let link = document.querySelector<HTMLLinkElement>('#dynamic-favicon');

    if (!link) {
      link = document.createElement('link');
      link.id = 'dynamic-favicon';
      link.rel = 'icon';
      document.head.appendChild(link);
    }

    link.type = 'image/svg+xml';
    link.href = finalHref;
  }, [theme]);
}
