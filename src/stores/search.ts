import { atom } from 'nanostores';

export const searchQuery = atom('');
export const filterType = atom('all');

export const updateSearch = (query: string) => {
  searchQuery.set(query);
};

export const updateFilter = (filter: string) => {
  filterType.set(filter);
};