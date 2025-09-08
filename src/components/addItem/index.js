import * as React from 'react';

import './index.scss';

const AddItem = ({ addItem }) => {
    const [text, setText] = React.useState('');
    const [err, setErr] = React.useState(false);

    const inputRef = React.useRef(null);

    const resetError = () => {
        setErr(false);
        window.removeEventListener('click', resetError);
    };

    const onChange = (event) => {
        setText(event.target.value);
        resetError();
    };

    const onClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (text.trim() !== '') {
            addItem(text);
            setText('');
        } else {
            setErr(true);
        }
        inputRef.current.focus();
    };

    React.useEffect(() => {
        if (err) {
            window.addEventListener('click', resetError);
        }
    }, [err]);

    const errMsg = 'введите что-нибудь';
    let errStyle = {
        width: `${errMsg.length * 0.5}rem`,
        display: 'none',
    };
    if (err) {
        errStyle.display = 'inline';
    }

    return (
        <div className="list_item list_add">
            <form>
                <div
                    className="list_add_input_wrapper"
                    style={{ position: 'relative' }}
                >
                    <span
                        className="error_msg"
                        style={errStyle}
                    >
                        {errMsg}
                    </span>
                    <input
                        ref={inputRef}
                        autoFocus
                        className="input list_add_input"
                        placeholder="запишите сюда"
                        onChange={onChange}
                        value={text}
                        name="создание элемента списка"
                    />
                </div>
                <button
                    className="list_add_button"
                    type="submit"
                    onClick={onClick}
                >
                    Добавить
                </button>
            </form>
        </div>
    );
};

export default AddItem;
