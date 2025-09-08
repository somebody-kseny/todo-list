import { withNaming } from '@bem-react/classname';

export const cn = withNaming({ n: 'ui-', e: '__', m: '_' });

export const mergeClasses = (...classes: string[]): string => {
    return classes.join(' ');
};
