import { Item } from './base';

export interface LocalStorage {
    list: Item[];
    theme: {
        theme: 'light' | 'dark';
    };
}
