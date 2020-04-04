import React from 'react';
import { ButtonGroup } from 'react-bootstrap';
import { Guest } from '../../Api';
import DisplayText from '../@ui/DisplayText';
import PrintInfo from '../@ui/PrintInfo';
import { GuestFormWithButtonModal } from './GuestForm';
import { GuestQuickFormWithButtonModal } from './GuestQuickForm';

const GuestRow: React.FC<Guest> = props => {
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
                    <PrintInfo guest={props} />
                    <GuestFormWithButtonModal {...props} />
                    <GuestQuickFormWithButtonModal {...props} />
                </ButtonGroup>
            </td>
        </tr>
    );
};

export default GuestRow;
