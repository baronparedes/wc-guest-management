import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { FaIdCard, FaPrint } from 'react-icons/fa';
import { Models } from '../../@types/models';
import DisplayText from '../@ui/DisplayText';
import ToggleModal from '../@ui/ToggleModal';

const BackroomGuestRow: React.FC<Models.GuestMetadata> = props => {
    return (
        <tr>
            <td>
                <h2>{props.tableNumber}</h2>
            </td>
            <td>{props.id}</td>
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
                        actionText="save"
                        modalSize="xl"
                        modalTitle="guest info form"
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
