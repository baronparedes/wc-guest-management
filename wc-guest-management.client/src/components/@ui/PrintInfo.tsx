import { Guest } from 'Api';
import React from 'react';
import { Button } from 'react-bootstrap';
import { FaPrint } from 'react-icons/fa';

type Props = {
    disabled?: boolean;
    guests?: Guest[];
    className?: string;
};

const PrintInfo = (props: Props) => {
    const handleOnPrint = () => {
        console.log('print');
        console.log(props.guests);
    };

    return (
        <Button
            disabled={props.disabled}
            onClick={handleOnPrint}
            className={props.className}>
            <FaPrint />
        </Button>
    );
};

export default PrintInfo;
