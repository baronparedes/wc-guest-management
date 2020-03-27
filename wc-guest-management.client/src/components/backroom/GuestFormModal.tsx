import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaIdCard } from 'react-icons/fa';
import { Guest } from '../../Api';
import ModalContainer from '../@ui/ModalContainer';
import GuestForm from './GuestForm';

const GuestFormModal = (props: Guest) => {
    const [toggle, setToggle] = useState(false);
    const handleOnShowModal = () => setToggle(true);
    const handleOnClose = () => setToggle(false);
    const handleOnFormSaved = () => {
        handleOnClose();
    };
    return (
        <>
            <Button
                variant="warning"
                type="button"
                onClick={handleOnShowModal}>
                <FaIdCard />
            </Button>
            <ModalContainer
                title="guest form"
                toggle={toggle}
                modalsize="xl"
                onClose={handleOnClose}>
                <GuestForm
                    guest={props}
                    onFormSaved={handleOnFormSaved}
                />
            </ModalContainer>
        </>
    );
};

export default GuestFormModal;
