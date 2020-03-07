import React, { useState } from 'react';
import { Button, ButtonProps } from 'react-bootstrap';
import ModalContainer from './ModalContainer';

type Props = {
    content: React.ReactNode;
    modalTitle: React.ReactNode;
    modalSize?: 'sm' | 'lg' | 'xl' | undefined;
};

const ToggleModal: React.FC<ButtonProps & Props> = props => {
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
                size={props.modalSize}
                title={props.modalTitle}
                toggle={toggle}
                onAction={handleOnAction}
                onClose={handleOnClose}>
                {props.children}
            </ModalContainer>
        </>
    );
};

export default ToggleModal;
