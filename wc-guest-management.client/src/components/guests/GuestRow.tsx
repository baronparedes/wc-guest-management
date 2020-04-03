import React from 'react';
import { ButtonGroup } from 'react-bootstrap';
import { Guest } from '../../Api';
import DisplayText from '../@ui/DisplayText';
import PrintInfo from '../@ui/PrintInfo';
import GuestFormModal from './GuestFormModal';

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
                    <GuestFormModal {...props} />
                </ButtonGroup>
            </td>
        </tr>
    );
};

export default GuestRow;
