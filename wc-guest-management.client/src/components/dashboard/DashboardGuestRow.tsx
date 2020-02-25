import React from 'react';
import { Button } from 'react-bootstrap';
import { FaPrint } from 'react-icons/fa';
import { Models } from '../../@types/models';
import DisplayText from '../@ui/DisplayText';

type Props = {
    info: Models.GuestInfo;
    onPrint?: (info: Models.GuestInfo) => void;
};

const DashboardGuestRow = (props: Props) => {
    const { info } = props;
    const handleOnPrint = () => {
        if (props.onPrint) {
            props.onPrint(info);
        }
    };
    return (
        <tr key={info.tableNumber}>
            <td>
                <h2>{info.tableNumber}</h2>
            </td>
            <td>
                <DisplayText>{info.guest}</DisplayText>
            </td>
            <td>
                <DisplayText>{info.volunteer}</DisplayText>
            </td>
            <td>
                <Button
                    size="lg"
                    onClick={handleOnPrint}
                    disabled={props.info.status === 'printing'}>
                    <FaPrint />
                </Button>
            </td>
        </tr>
    );
};

export default DashboardGuestRow;
