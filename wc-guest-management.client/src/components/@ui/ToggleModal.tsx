import React, { useState } from 'react';
import { Button, ButtonProps } from 'react-bootstrap';
import ModalContainer, { ModalProps } from './ModalContainer';

type Props = {
    content: React.ReactNode;
    onClick?: () => void;
};

const ToggleModal: React.FC<ButtonProps &
    Props &
    ModalProps> = props => {
    const [toggle, setToggle] = useState(false);
    const handleOnShowModal = () => setToggle(true);
    const handleOnClose = () => setToggle(false);
    const handleOnAction = () => {
        props.onClick && props.onClick();
        handleOnClose();
    };
    return (
        <>
            <Button
                {...(props as ButtonProps)}
                onClick={handleOnShowModal}>
                {props.content}
            </Button>
            <ModalContainer
                modalSize={props.modalSize}
                title={props.title}
                label={props.label}
                toggle={toggle}
                onAction={handleOnAction}
                onClose={handleOnClose}>
                {props.children}
            </ModalContainer>
        </>
    );
};

export default ToggleModal;
