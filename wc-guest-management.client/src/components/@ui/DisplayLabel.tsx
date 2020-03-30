import classNames from 'classnames';
import React from 'react';

type Props = {
    className?: string;
};

const DisplayLabel: React.FC<Props> = props => {
    return (
        <label className={classNames('display-4', props.className)}>
            {props.children}
        </label>
    );
};

export default DisplayLabel;
