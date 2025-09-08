import * as React from 'react';

import './index.scss';

export const EditForm = ({ item, submit, submitRef }) => {
    const [value, setValue] = React.useState(item.text);

    const onChange = (event) => {
        setValue(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        submit(value);
    };

    return (
        <form className="edit_form">
            <input
                autoFocus
                onBlur={onSubmit}
                type="text"
                value={value}
                onChange={onChange}
                className="input edit_form__input"
                name="редактирование элемента"
            />
            <button
                type="submit"
                onClick={onSubmit}
                style={{ display: 'none' }}
                ref={submitRef}
            />
        </form>
    );
};
