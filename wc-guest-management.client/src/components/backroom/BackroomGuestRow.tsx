import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { FaIdCard, FaPrint } from 'react-icons/fa';
import { Guest } from '../../Api';
import DisplayText from '../@ui/DisplayText';
import ToggleModal from '../@ui/ToggleModal';

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
                    <ToggleModal
                        label="save"
                        modalSize="xl"
                        title="guest info form"
                        variant="warning"
                        type="button"
                        content={<FaIdCard />}>
                        {props.children}
                    </ToggleModal>
                </ButtonGroup>
            </td>
        </tr>
    );
};

export default BackroomGuestRow;
