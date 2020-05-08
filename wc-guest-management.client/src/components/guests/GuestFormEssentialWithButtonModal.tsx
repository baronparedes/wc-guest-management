import { Guest } from 'Api';
import { withEditGuestButtonModal } from 'hoc/withEditGuestButtonModal';
import React from 'react';
import { FaIdCardAlt } from 'react-icons/fa';
import GuestFormEssential from './GuestFormEssential';

const FormWithModal = withEditGuestButtonModal(GuestFormEssential);
const GuestFormEssentialWithButtonModal = (props: Guest) => {
    return (
        <FormWithModal
            title="guest essential data"
            header="guest essential data"
            guest={props}
            variant="dark">
            <FaIdCardAlt />
        </FormWithModal>
    );
};

export default GuestFormEssentialWithButtonModal;
