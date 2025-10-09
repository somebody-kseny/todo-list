import * as React from 'react';
import TodoList from '@components/todoList';
import AddItem from '@components/addItem';

import type { Item } from '../../types';

import * as storageHelpers from '../../helpers/storage';
import { useTheme } from '../../hooks/useTheme';

import './index.scss';
import { IconButton } from 'ui';

import SunIcon from '../../images/icons/sun.svg';
import MoonIcon from '../../images/icons/moon.svg';
import UndoIcon from '../../images/icons/undo.svg';

const REMOVED_STACK_MAX_LENGTH = 20;

export const App: React.FC = () => {
    const [list, setList] = React.useState<Item[]>(
        storageHelpers.getJsonItem('list', []),
    );

    const [removed, setRemoved] = React.useState<Item[]>(
        storageHelpers.getJsonItem('removedItems', []),
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
        const idx = list.findIndex((item) => item.id === id);
        const res = list.toSpliced(idx, 1);

        setList(res);
        storageHelpers.setJsonItem('list', res);

        const resRemoved =
            removed.length >= REMOVED_STACK_MAX_LENGTH ?
                [...removed.toSpliced(0, 1), list[idx]]
            :   [...removed, list[idx]];

        setRemoved(resRemoved);
        storageHelpers.setJsonItem('removedItems', resRemoved);
    };

    const undoRemove = () => {
        if (removed.length === 0) {
            return;
        }

        const res = [removed[removed.length - 1], ...list];
        setList(res);
        storageHelpers.setJsonItem('list', res);

        const removedRes = removed.toSpliced(-1, 1);
        setRemoved(removedRes);
        storageHelpers.setJsonItem('removedItems', removedRes);
    };

    const { theme, changeTheme } = useTheme();

    const ThemeIcon = theme === 'light' ? MoonIcon : SunIcon;

    return (
        <div className="wrapper">
            <div className="wrapper__corner_icons">
                {removed.length > 0 && (
                    <IconButton
                        className="theme_icon"
                        onClick={undoRemove}
                    >
                        <UndoIcon className="theme_icon__svg" />
                    </IconButton>
                )}
                <IconButton
                    onClick={changeTheme}
                    className="theme_icon"
                >
                    <ThemeIcon className="theme_icon__svg" />
                </IconButton>
            </div>

            <h2 className="header">Список дел</h2>
            <div className="list_wrapper">
                <AddItem addItem={addItem} />
                <TodoList
                    items={list}
                    callbacks={{
                        changeItemDone,
                        changeItem,
                        removeItem,
                    }}
                />
            </div>
        </div>
    );
};
