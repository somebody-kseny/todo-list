import type { LocalStorage } from '@projectTypes/localStorage';

export const getItem = (key: keyof LocalStorage, def: string): string => {
    return window.localStorage.getItem(key) || def;
};

export const getJsonItem = <T extends keyof LocalStorage>(
    key: T,
    def: LocalStorage[T],
): LocalStorage[T] => {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : def;
};

export const setItem = (key: keyof LocalStorage, value: string) => {
    window.localStorage.setItem(key, value);
};

export const setJsonItem = <T extends keyof LocalStorage>(
    key: T,
    value: LocalStorage[T],
) => {
    window.localStorage.setItem(key, JSON.stringify(value));
};
