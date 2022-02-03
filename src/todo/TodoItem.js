import React, { useState } from "react";
import EditItem from "./EditItem";

const crossStyle = {
    fontFamily: "'Caveat', Roboto, sans-serif",
    fontSize: 30,
    fontStretch: "ultra-expanded",
    lineHeight: "40%",
    paddingRight: 12,
    paddingBottom: 12,
    paddingLeft: 8,
    paddingTop: 8
}

const TodoItem = ( {item, changeItemDone, changeItem, removeItem} ) => {
    const [isEdited, setIfEdited] = React.useState(false);

    const startEdit = () => {
        setIfEdited(true);
    };

    let textStyle = {};
    if (item.done) {
        textStyle = {
            textDecoration: "line-through"
        };
    }


    return (
        <li className="list_item">
            <div>
                <input type="checkbox" checked={item.done} className="list_item_done" onChange={() => {
                    changeItemDone(item.id);
                }}></input>

                { isEdited
                ? <EditItem item={item} changeItem={changeItem} setIfEdited={setIfEdited}/>
                : <p onDoubleClick={startEdit} className="input" style={textStyle}>{item.text}</p>}

            </div>
            <button className="list_item_delete" style={crossStyle} onClick={() => {
                removeItem(item.id);
            }}>х</button>
        </li>
    );
}

export default TodoItem;