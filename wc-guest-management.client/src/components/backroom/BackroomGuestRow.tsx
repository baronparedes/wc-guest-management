import React from 'react';
import { FaIdCard } from 'react-icons/fa';
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
                <ToggleModal
                    modalSize="xl"
                    modalTitle="guest info form"
                    variant="warning"
                    type="button"
                    content={<FaIdCard />}>
                    {props.children}
                </ToggleModal>
            </td>
        </tr>
    );
};

export default BackroomGuestRow;
