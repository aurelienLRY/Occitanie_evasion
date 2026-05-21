import type { MetadataRoute } from 'next';
import { AppRoutes, TRoutes } from '@/config/App-Routing';

const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://www.occitanie-evasion.com';

const extraRoutes: {
  path: string;
  priority: number;
  changeFrequency: 'monthly' | 'weekly';
}[] = [
  { path: '/faq', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/reservation', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/mention-legal', priority: 0.3, changeFrequency: 'monthly' },
  { path: '/politique-de-confidentialite', priority: 0.3, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routesMap = AppRoutes.map((route: TRoutes) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route.path === '/' ? 1 : 0.8,
  }));

  const extra = extraRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  return [...routesMap, ...extra];
}
