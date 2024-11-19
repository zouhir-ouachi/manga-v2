import { atom } from 'nanostores';

export const CHAPTERS_PER_PAGE = 20;
export const currentPage = atom(1);
export const isLoadingMore = atom(false);