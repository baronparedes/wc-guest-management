import React from 'react';
import { Guest } from '../../Api';
import ModalContainer from '../@ui/ModalContainer';
import GuestTable from './GuestTable';

type Props = {
    guests?: Guest[];
    toggle: boolean;
    onClose?: () => void;
};

const GuestTableModal = (props: Props) => {
    return (
        <ModalContainer
            title="guests"
            toggle={props.toggle}
            modalsize="lg"
            onClose={props.onClose}>
            <GuestTable guests={props.guests} />
        </ModalContainer>
    );
};

export default GuestTableModal;
