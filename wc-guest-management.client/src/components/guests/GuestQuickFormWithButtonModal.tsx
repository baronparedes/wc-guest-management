import { Guest } from 'Api';
import { withEditGuestButtonModal } from 'hoc/withEditGuestButtonModal';
import React from 'react';
import { FaIdCardAlt } from 'react-icons/fa';
import GuestQuickForm from './GuestQuickForm';

const FormWithModal = withEditGuestButtonModal(GuestQuickForm);
const GuestQuickFormWithButtonModal = (props: Guest) => {
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

export default GuestQuickFormWithButtonModal;
