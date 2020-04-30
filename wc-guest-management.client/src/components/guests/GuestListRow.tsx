import { Guest } from 'Api';
import DisplayText from 'components/@ui/DisplayText';
import PrintInfo from 'components/@ui/PrintInfo';
import React from 'react';
import { ButtonGroup } from 'react-bootstrap';
import GuestFormWithButtonModal from './GuestFormWithButtonModal';
import GuestQuickFormWithButtonModal from './GuestQuickFormWithButtonModal';

const GuestListRow: React.FC<Guest> = (props) => {
    return (
        <tr>
            <td>
                <h2>{props.tableNumber}</h2>
            </td>
            <td>{props.series}</td>
            <td>
                <DisplayText>{props.guest}</DisplayText>
            </td>
            <td>
                <DisplayText>{props.volunteer}</DisplayText>
            </td>
            <td>
                <ButtonGroup>
                    <PrintInfo guests={[props]} />
                    <GuestFormWithButtonModal {...props} />
                    <GuestQuickFormWithButtonModal {...props} />
                </ButtonGroup>
            </td>
        </tr>
    );
};

export default GuestListRow;
