import * as React from 'react';
import TodoList from '@components/todoList';
import AddItem from '@components/addItem';

import type { Item } from '../../types';

import * as storageHelpers from '../../helpers/storage';

import './index.scss';

export const App: React.FC = () => {
    const [list, setList] = React.useState<Item[]>(
        storageHelpers.getJsonItem('list', []),
    );

    const addItem = (text: string) => {
        const res = list.concat({
            text,
            done: false,
            id: Date.now(),
        });

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

    const themes = [
        // light
        {
            '--c-bg': 'white',
            '--c-header': '#F28482',
            '--c-button': '#84A59D',
            '--c-button-hover': '#57756E',
            '--c-edit-bg': '#FCEFEE',
            '--c-text': 'black',
        },
        // dark
        {
            '--c-bg': '#121212',
            '--c-header': '#FFFF79',
            '--c-button': '#8C2F39',
            '--c-button-hover': '#B23A48',
            '--c-edit-bg': '#474747',
            '--c-text': 'white',
        },
    ];

    const startTheme = storageHelpers.getJsonItem('theme', { theme: 0 }).theme;
    const [themeNum, setThemeNum] = React.useState(startTheme);

    const bodyNode = document.body || document.getElementsByTagName('body')[0];
    Object.entries(themes[themeNum]).forEach(([key, value]) => {
        bodyNode.style.setProperty(key, value);
    });

    const changeTheme = () => {
        let res = 0;
        if (themes.length - themeNum > 1) {
            res = themeNum + 1;
        }
        setThemeNum(res);
        storageHelpers.setJsonItem('theme', { theme: res });
    };

    return (
        <div className="wrapper">
            <button
                className="theme_icon"
                onClick={changeTheme}
            >
                <img src="./images/icons/pallete.png" />
            </button>
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
