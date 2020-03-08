import React from 'react';
import { Button } from 'react-bootstrap';
import { FaPrint } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Models } from '../../@types/models';
import { dashboardActions } from '../../store/reducers/dashboard.reducer';

type Props = {
    disabled?: boolean;
    info: Models.GuestInfo;
};

const PrintInfo = (props: Props) => {
    const dispatch = useDispatch();
    const handleOnPrint = () => {
        dispatch(dashboardActions.print(props.info));
    };

    return (
        <Button disabled={props.disabled} onClick={handleOnPrint}>
            <FaPrint />
        </Button>
    );
};

export default PrintInfo;
