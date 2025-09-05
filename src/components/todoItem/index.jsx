import * as React from 'react';
import { EditItem } from '@components/editItem';

import './index.scss';

const TodoItem = ({ item, changeItemDone, changeItem, removeItem }) => {
    const [isEdited, setIfEdited] = React.useState(false);

    const startEdit = () => {
        setIfEdited(true);
    };

    let textStyle = {};
    if (item.done) {
        textStyle = {
            textDecoration: 'line-through',
        };
    }

    return (
        <li className="list_item">
            <div>
                <input
                    type="checkbox"
                    checked={item.done}
                    className="list_item_done"
                    onChange={() => {
                        changeItemDone(item.id);
                    }}
                ></input>

                {isEdited ?
                    <EditItem
                        item={item}
                        changeItem={changeItem}
                        setIfEdited={setIfEdited}
                    />
                :   <p
                        onDoubleClick={startEdit}
                        className="input"
                        style={textStyle}
                    >
                        {item.text}
                    </p>
                }
            </div>
            <button
                className="list_item_delete"
                onClick={() => {
                    removeItem(item.id);
                }}
            >
                х
            </button>
        </li>
    );
};

export default TodoItem;
