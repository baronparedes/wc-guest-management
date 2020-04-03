import React from 'react';
import { Button } from 'react-bootstrap';
import { FaPrint } from 'react-icons/fa';
import { Guest } from '../../Api';

type Props = {
    disabled?: boolean;
    guest: Guest;
};

const PrintInfo = (props: Props) => {
    const handleOnPrint = () => {
        console.log('print');
        console.log(props.guest);
    };

    return (
        <Button disabled={props.disabled} onClick={handleOnPrint}>
            <FaPrint />
        </Button>
    );
};

export default PrintInfo;
