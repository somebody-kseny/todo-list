import React, { useState } from "react";
import TodoList from "./todo/TodoList";
import TodoItem from "./todo/TodoItem";
import AddItem from "./todo/AddItem";

// item
// text: "string"
// done: true
// id: 0

const App = () => {
    const [list, setList] = React.useState(JSON.parse(window.localStorage.getItem('list')) || []);
    
    const addItem = (text) => {
        const res = list.concat({
            text,
            done: false,
            id: Date.now()
        });

        setList(res);
        localStorage.setItem('list', JSON.stringify(res));
    }

    const changeItemDone = (id) => {
        const res = list.map(item => {
            if (item.id === id) {
                item.done = !item.done;
            }
            return item;
        });

        setList(res);
        localStorage.setItem('list', JSON.stringify(res));
    }

    const changeItem = (id, text) => {
        const res = list.map(item => {
            if (item.id === id) {
                item.text = text;
            }
            return item;
        });

        setList(res);
        localStorage.setItem('list', JSON.stringify(res));
    }

    const removeItem = (id) => {
        const res = list.filter(item => item.id !== id);

        setList(res);
        localStorage.setItem('list', JSON.stringify(res));
    }

    const themes = [
        // light
        {
            "--c-bg": "white",
            "--c-header": "#F28482",
            "--c-button": "#84A59D",
            "--c-button-hover": "#57756E",
            "--c-edit-bg": "#FCEFEE",
            "--c-text": "black"
        },
        // dark
        {
            "--c-bg": "black",
            "--c-header": "#F28482",
            "--c-button": "#84A59D",
            "--c-button-hover": "#57756E",
            "--c-edit-bg": "#FCEFEE",
            "--c-text": "white"
        },
        // strange
        // {

        // }
    ];

    let startTheme = 0;
    if (window.localStorage.getItem('theme')) {
        startTheme = JSON.parse(window.localStorage.getItem('theme')).theme;
    }
    const [themeNum, setThemeNum] = React.useState( startTheme );

    const bodyNode = document.body || document.getElementsByTagName('body')[0];
    Object.keys(themes[themeNum]).forEach(key => {
        bodyNode.style.setProperty(key, themes[themeNum][key]);
    });

    const changeTheme = () => {
        let res = 0;
        if (themes.length - themeNum > 1) {
            res = themeNum + 1;
        }
        setThemeNum(res);
        localStorage.setItem('theme', JSON.stringify({ theme: res }));
    }

    return (
            <div className='wrapper'>
                <button className='theme_icon' onClick={changeTheme}><img src="./images/icons/pallete.png" /></button>
                <h2 className='header'>Список дел</h2>
                <div className='list_wrapper'>
                    <AddItem addItem={addItem}/>
                    <TodoList {...{
                        items: list, 
                        callbacks: {
                            changeItemDone,
                            changeItem,
                            removeItem
                        }
                    }}/>
                </div>
            </div>
    );
}

export default App;