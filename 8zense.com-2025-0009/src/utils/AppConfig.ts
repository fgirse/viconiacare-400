import type { LocalePrefixMode } from '@/src/utils2/types';

const localePrefix: LocalePrefixMode = 'as-needed';

// FIXME: Update this configuration file based on your project information
export const AppConfig = {
  name: 'Nextjs Starter',
  locales: ['en','de', 'fr'],
  defaultLocale: 'en',
  localePrefix,
};
