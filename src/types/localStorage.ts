import { Item } from './base';

export type Theme = 'light' | 'dark';

export interface LocalStorage {
    list: Item[];
    removedItems: Item[];
    theme: {
        theme: Theme;
    };
}
