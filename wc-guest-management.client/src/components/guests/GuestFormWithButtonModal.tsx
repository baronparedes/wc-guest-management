import { Guest } from 'Api';
import { withEditGuestButtonModal } from 'hoc/withEditGuestButtonModal';
import React from 'react';
import { FaIdCard } from 'react-icons/fa';
import GuestForm from './GuestForm';

const FormWithModal = withEditGuestButtonModal(GuestForm);
const GuestFormWithButtonModal = (props: Guest) => {
    return (
        <FormWithModal
            title="guest data"
            header="guest data"
            guest={props}
            variant="warning"
            modalsize="xl">
            <FaIdCard />
        </FormWithModal>
    );
};
export default GuestFormWithButtonModal;
