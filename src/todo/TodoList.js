import React, { useState } from "react";
// import { Children } from "react/cjs/react.development";
import TodoItem from "./TodoItem";

const TodoList = ( props ) => {
    const { items } = props;
    if (!items || items.length <= 0) {
        return (
            <div className={"list_item"} style={{border: "none", backgroundColor: "transparent"}}>
                <p style={{textAlign: "center", width: "100%"}}>Нет ни одного дела</p>
            </div>
        );
    }
    return (
        <ul className="list">
            {   
                items.map((item, index) => <TodoItem {...{item, ...props.callbacks, key: index}}></TodoItem>)
            }
        </ul>
    );
}

export default TodoList;