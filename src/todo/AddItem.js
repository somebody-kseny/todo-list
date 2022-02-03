import React, { useState } from "react";

const AddItem = ( { addItem } ) => {
    const [text, setText] = React.useState("");
    const [err, setErr] = React.useState(false);

    const onChange = (event) => {
        setText(event.target.value);
    }
    

    const onClick = (event) => {
        event.preventDefault();
        if (text.trim() !== '') {
            addItem(text);
            setText("");
        } else {
            console.log('here');
            setErr(true);

            let counter = 0;
            const hideErr = (e) => {
                if (counter > 0) {
                    setErr(false);
                    e.currentTarget.removeEventListener("click", hideErr);
                    counter = 0;
                } else {
                    counter ++;
                }
                
            };

            (document.body || document.getElementsByTagName('body')[0]).addEventListener("click", hideErr);
        }
    }

    const errMsg = "введите что-нибудь";
    let errStyle = {
        width: `${errMsg.length * 0.5}rem`,
        display: "none"
    };
    if (err) {
       errStyle.display = "inline"; 
    }

    return (
        <div className="list_item list_add">
            <form>
                <div style={{position: "relative"}}>
                    <span className="error_msg" style={errStyle}>{errMsg}</span>
                    <input className="input list_add_input" placeholder='запишите сюда' onChange={onChange} value={text}/>
                </div>
                <button className="list_add_button" type='submit' onClick={onClick}>Добавить</button>
            </form>
        </div>
    );
}

export default AddItem;