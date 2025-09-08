import * as React from 'react';
import TodoList from '@components/todoList';
import AddItem from '@components/addItem';

import type { Item } from '../../types';

import * as storageHelpers from '../../helpers/storage';

import './index.scss';
import { IconButton } from 'ui';

import ThemeIcon from '../../images/icons/theme.svg';

export const App: React.FC = () => {
    const [list, setList] = React.useState<Item[]>(
        storageHelpers.getJsonItem('list', []),
    );

    const addItem = (text: string) => {
        const res = [
            {
                text,
                done: false,
                id: Date.now(),
            },
            ...list,
        ];

        setList(res);
        storageHelpers.setJsonItem('list', res);
    };

    const changeItemDone = (id: number) => {
        const res = list.map((item) => {
            if (item.id === id) {
                item.done = !item.done;
            }
            return item;
        });

        setList(res);
        storageHelpers.setJsonItem('list', res);
    };

    const changeItem = (id: number, text: string) => {
        const res = list.map((item) => {
            if (item.id === id) {
                item.text = text;
            }
            return item;
        });

        setList(res);
        storageHelpers.setJsonItem('list', res);
    };

    const removeItem = (id: number) => {
        const res = list.filter((item) => item.id !== id);

        setList(res);
        storageHelpers.setJsonItem('list', res);
    };

    const startTheme = storageHelpers.getJsonItem('theme', {
        theme: 'light',
    }).theme;
    const [theme, setTheme] = React.useState(startTheme);
    React.useEffect(() => {
        document.body.dataset.theme = theme;
    }, [theme]);

    const changeTheme = () => {
        let res: 'dark' | 'light' = 'dark';

        if (theme === 'dark') {
            res = 'light';
        }

        storageHelpers.setJsonItem('theme', { theme: res });
        setTheme(res);
    };

    return (
        <div className="wrapper">
            <IconButton
                onClick={changeTheme}
                className="theme_icon"
            >
                <ThemeIcon className="theme_icon__svg" />
            </IconButton>
            <h2 className="header">Список дел</h2>
            <div className="list_wrapper">
                <AddItem addItem={addItem} />
                <TodoList
                    {...{
                        items: list,
                        callbacks: {
                            changeItemDone,
                            changeItem,
                            removeItem,
                        },
                    }}
                />
            </div>
        </div>
    );
};
