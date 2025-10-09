import * as React from 'react';

import type { Theme } from '../types';

import * as storageHelpers from '../helpers/storage';

const startTheme = storageHelpers.getJsonItem('theme', {
    theme: 'light',
}).theme;

export const useTheme = () => {
    const [theme, setTheme] = React.useState(startTheme);

    React.useEffect(() => {
        document.body.dataset.theme = theme;
    }, [theme]);

    const changeTheme = () => {
        let res: Theme = 'dark';

        if (theme === 'dark') {
            res = 'light';
        }

        storageHelpers.setJsonItem('theme', { theme: res });
        setTheme(res);
    };

    return {
        theme,
        changeTheme,
    };
};
