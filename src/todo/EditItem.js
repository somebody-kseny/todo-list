import React, { useState } from "react";

const EditItem = ( {item, changeItem, setIfEdited} ) => {
    const [value, setValue] = React.useState(item.text);

    const stopEdit = (event) => {
        event.preventDefault();
        if (value.trim() !== "") {
            changeItem(item.id, value);
        }
        setIfEdited(false);
    }

    const onChange = (event) => {
        setValue(event.target.value);
    }

    return (
        <form>
            <input autoFocus onBlur={stopEdit} type="text"  value={value} onChange={onChange} className="edit_input"/>
            <button type="submit" onClick={stopEdit} style={{display: "none"}}>lf</button>
        </form>
    );
}

export default EditItem;