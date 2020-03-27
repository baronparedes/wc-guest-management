import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { FaPrint } from 'react-icons/fa';
import { Guest } from '../../Api';
import DisplayText from '../@ui/DisplayText';
import GuestFormModal from './GuestFormModal';

const BackroomGuestRow: React.FC<Guest> = props => {
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
                    <Button>
                        <FaPrint />
                    </Button>
                    <GuestFormModal {...props} />
                </ButtonGroup>
            </td>
        </tr>
    );
};

export default BackroomGuestRow;
