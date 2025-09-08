import * as React from 'react';

import { cn, mergeClasses } from '../classNamesConfig';

import './index.scss';
import { requestFormReset } from 'react-dom';

const iconButton = cn('iconButton');

interface Props
    extends Pick<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        'onClick' | 'children' | 'className' | 'type'
    > {
    destructive?: boolean;
}

export const IconButton: React.FC<Props> = ({
    onClick,
    children,
    className,
    destructive,
}) => {
    return (
        <button
            className={mergeClasses(iconButton({ destructive }), className)}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
