import * as React from 'react';
import TodoItem from '../todoItem';

import './index.scss';

const TodoList = (props) => {
    const { items } = props;
    if (!items || items.length <= 0) {
        return (
            <p style={{ textAlign: 'center', width: '100%' }}>
                Нет ни одного дела
            </p>
        );
    }
    return (
        <ul className="list">
            {items.map((item, index) => (
                <TodoItem
                    {...{ item, ...props.callbacks, key: index }}
                ></TodoItem>
            ))}
        </ul>
    );
};

export default TodoList;
