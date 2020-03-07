import React, { useState } from 'react';
import { Button, ButtonProps } from 'react-bootstrap';
import ModalContainer, { ModalProps } from './ModalContainer';

type Props = {
    content: React.ReactNode;
};

const ToggleModal: React.FC<ButtonProps &
    Props &
    ModalProps> = props => {
    const [toggle, setToggle] = useState(false);
    const handleOnShowModal = () => setToggle(true);
    const handleOnClose = () => setToggle(false);
    const handleOnAction = () => {
        // TODO: Add Action
        handleOnClose();
    };
    return (
        <>
            <Button {...props} onClick={handleOnShowModal}>
                {props.content}
            </Button>
            <ModalContainer
                modalSize={props.modalSize}
                modalTitle={props.modalTitle}
                toggle={toggle}
                onAction={handleOnAction}
                onClose={handleOnClose}>
                {props.children}
            </ModalContainer>
        </>
    );
};

export default ToggleModal;
