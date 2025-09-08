import * as React from 'react';
import { EditForm } from '@components/editForm';

import { IconButton } from 'ui';
import SaveIcon from '../../images/icons/save.svg';
import EditIcon from '../../images/icons/edit.svg';
import TrashIcon from '../../images/icons/trash.svg';

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

    const submit = (value) => {
        setIfEdited(false);
        changeItem(item.id, value);
    };

    const submitRef = React.useRef();

    return (
        <li className="list_item list_item_base">
            <input
                type="checkbox"
                checked={item.done}
                className="list_item__done"
                onChange={() => {
                    changeItemDone(item.id);
                }}
                name="пометить прочитанным"
            ></input>

            {isEdited ?
                <EditForm
                    item={item}
                    submit={submit}
                    submitRef={submitRef}
                />
            :   <p
                    onDoubleClick={startEdit}
                    className="input"
                    style={textStyle}
                >
                    {item.text}
                </p>
            }
            {isEdited ?
                <IconButton
                    onClick={() => {
                        submitRef.current.click();
                    }}
                >
                    <SaveIcon />
                </IconButton>
            :   <>
                    <IconButton
                        onClick={() => removeItem(item.id)}
                        destructive
                    >
                        <TrashIcon />
                    </IconButton>
                    <IconButton onClick={() => startEdit(item.id)}>
                        <EditIcon />
                    </IconButton>
                </>
            }
        </li>
    );
};

export default TodoItem;
