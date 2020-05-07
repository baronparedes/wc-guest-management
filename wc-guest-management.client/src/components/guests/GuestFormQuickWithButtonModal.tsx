import { Guest } from 'Api';
import { withEditGuestButtonModal } from 'hoc/withEditGuestButtonModal';
import React from 'react';
import { FaIdCardAlt } from 'react-icons/fa';
import GuestFormQuick from './GuestFormQuick';

const FormWithModal = withEditGuestButtonModal(GuestFormQuick);
const GuestFormQuickWithButtonModal = (props: Guest) => {
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

export default GuestFormQuickWithButtonModal;
