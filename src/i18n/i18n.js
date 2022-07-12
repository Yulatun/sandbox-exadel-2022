import i18next from 'i18next';
import i18n_en from './i18n_en.json';

i18next.init({ lng: 'en', defaultNS: 'translations', resources: {} });
i18next.addResourceBundle('en', 'translations', i18n_en, true, true);

export const i18n = i18next;
