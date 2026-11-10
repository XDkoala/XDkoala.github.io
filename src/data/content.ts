import * as zh from './zh';
import * as en from './en';
import type { Lang } from '../i18n/ui';

export const getContent = (lang: Lang): typeof zh => (lang === 'en' ? (en as typeof zh) : zh);
